import { BlacklistModel } from "@/models/blackListModel";
import cron from "node-cron";
cron.schedule("0 * * * *", async () => {
  try {
    const result = await BlacklistModel.deleteMany({
      expiresAt: { $lte: new Date() },
    });
    console.log(`Cleaned up ${result.deletedCount} expired tokens.`);
  } catch (error) {
    console.error("Failed to clean up expired tokens:", error);
  }
});
