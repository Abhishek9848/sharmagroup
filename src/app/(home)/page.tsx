import HomePage from "@/components/Home";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";


type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  // Call it on server
  const paymentsOverviewTimeFrame = extractTimeFrame("payments_overview")?.split(":")[1];
  const weeksProfitTimeFrame = extractTimeFrame("weeks_profit")?.split(":")[1];

  return (
    <>
      <HomePage 
      paymentsOverviewTimeFrame={paymentsOverviewTimeFrame}
      weeksProfitTimeFrame={weeksProfitTimeFrame} 
      />
    </>
  );
}
