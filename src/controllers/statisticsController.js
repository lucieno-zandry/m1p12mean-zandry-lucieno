import prisma from "../../prisma/prisma.js";
import { startOfWeek, subWeeks, addDays, format } from "date-fns";

export default {
  weeklyAppointments: async (req, res) => {
    try {
      const now = new Date();
      const stats = [];

      for (let i = 3; i >= 0; i--) {
        const weekStart = startOfWeek(subWeeks(now, i), { weekStartsOn: 1 }); // Lundi
        const weekEnd = addDays(weekStart, 7);

        const count = await prisma.appointment.count({
          where: {
            createdAt: {
              gte: weekStart,
              lt: weekEnd,
            },
          },
        });

        stats.push({
          week: format(weekStart, "yyyy-MM-dd"),
          count,
        });
      }

      res.json({ stats });
    } catch (error) {
      console.error("Error getting stats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
