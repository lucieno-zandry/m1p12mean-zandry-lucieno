import { validationResult } from "express-validator";
import prisma from "../../prisma/prisma.js";

export default {
  store: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { serviceType, notes, mechanicId } = req.body;
    const date = new Date(req.body.date);
    const clientId = req.user.id;

    try {
      // Check if this slot already has an appointment
      const existing = await prisma.appointment.findFirst({
        where: {
          date,
          status: { not: "CANCELLED" }, // allow rebooking cancelled slots
        },
      });

      if (existing) {
        return res.status(409).json({ message: "This slot is already booked" });
      }

      const appointment = await prisma.appointment.create({
        data: {
          clientId,
          date,
          serviceType,
          status: "PENDING",
          notes,
          mechanicId,
        },
      });

      res.status(201).json({ message: "Appointment created", appointment });
    } catch (error) {
      console.error("Create appointment error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  index: async (req, res) => {
    try {
      const userId = req.user.id;

      const appointments = await prisma.appointment.findMany({
        where: {
          clientId: userId,
        },
        orderBy: {
          date: "asc",
        },
      });

      res.status(200).json(appointments);
    } catch (error) {
      console.error("Get appointments error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  assigned: async (req, res) => {
    const mechanicId = req.user.id;

    try {
      // Récupérer tous les rendez-vous assignés à ce mécanicien
      const appointments = await prisma.appointment.findMany({
        where: { mechanicId },
        orderBy: { date: "asc" },
        include: {
          client: {
            select: { name: true, email: true, phone: true },
          },
        },
      });

      res.status(200).json({ appointments });
    } catch (error) {
      console.error("Get assigned appointments error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  updateStatus: async (req, res) => {
    const mechanicId = req.user.id;
    const appointmentId = req.params.id;
    const { status } = req.body;

    try {
      // Vérifier que le rendez-vous existe et appartient à ce mécanicien
      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
      });

      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      if (appointment.mechanicId !== mechanicId) {
        return res
          .status(403)
          .json({ message: "You are not assigned to this appointment" });
      }

      // Mettre à jour le statut
      const updatedAppointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status },
      });

      res
        .status(200)
        .json({ message: "Status updated", appointment: updatedAppointment });
    } catch (error) {
      console.error("Update status error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  all: async (req, res) => {
    try {
      const appointments = await prisma.appointment.findMany({
        include: {
          client: {
            select: { id: true, name: true, email: true },
          },
          mechanic: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: {
          date: "asc",
        },
      });

      res.status(200).json({ appointments });
    } catch (error) {
      console.error("Error fetching all appointments:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  update: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const appointmentId = req.params.id;
    const { status = "", ...data } = req.body;

    try {
      let appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
      });

      if (!appointment)
        return res.status(404).json({ message: "Appointment not found!" });

      if (
        req.user.role !== "MANAGER" &&
        appointment.clientId !== req.user.id &&
        appointment.mechanicId !== req.user.id
      )
        return res.status(403);

      appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data,
      });

      res.json({ appointment });
    } catch (e) {
      res.status(500).json({ message: "Internal server error!" });
    }
  },
};
