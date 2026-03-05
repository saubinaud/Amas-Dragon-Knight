import { type FC } from 'react';
import { HeroElite } from './components/HeroElite';
import { StatsStrip } from './components/StatsStrip';
import { TransformationProcess } from './components/TransformationProcess';
import { RedCTA } from './components/RedCTA';
import { MembershipPlans } from './components/MembershipPlans';

/**
 * Sales-focused landing page.
 * Flow: Hero (Elite) → Stats → Transformation Process → CTA → Pricing
 */
export const HomePage: FC = () => {
    return (
        <main className="bg-dk-black text-dk-white">
            <HeroElite />
            <StatsStrip />
            <TransformationProcess />
            <RedCTA />
            <MembershipPlans />
        </main>
    );
};
