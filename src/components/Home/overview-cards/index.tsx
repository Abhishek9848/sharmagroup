"use client";

import { OverviewCard } from "./card";
import { IconType } from "react-icons"; // import IconType

export type DashboardCard = {
  label: string;
  value: string;
  Icon: IconType;
  iconColor?: string;
  textColor?: string;
  subText?: string;
  progress?: number;
  isProfit?: boolean; // Optional: for dynamic profit/loss coloring
};

type Props = {
  cards: DashboardCard[];
};

export function OverviewCardsGroup({ cards }: Props) {

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {cards.map(({ label, value, Icon, iconColor, subText, progress, textColor }) => (
        <OverviewCard
          key={label}
          label={label}
          data={{ value, subText, progress }}
          Icon={Icon}
          iconColor={iconColor}
          textColor={textColor}
        />
      ))}
    </div>
  );
}
