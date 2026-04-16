import { type FC } from 'react';
import { HeroElite } from './components/HeroElite';
import { StatsStrip } from './components/StatsStrip';
import { BeltJourney } from './components/BeltJourney';
import { TransformationProcess } from './components/TransformationProcess';
import { Instructors } from './components/Instructors';
import { Testimonials } from './components/Testimonials';
import { RedCTA } from './components/RedCTA';
import { MembershipPlans } from './components/MembershipPlans';
import { FAQ } from './components/FAQ';

/**
 * Sales-focused landing page.
 * Flow: Hero → Stats → Why Us → Pricing (early) → Belt Journey → Instructors → Testimonials → CTA → FAQ
 */
export const HomePage: FC = () => {
    return (
        <main className="bg-dk-black text-dk-white">
            <HeroElite />
            <StatsStrip />
            <TransformationProcess />
            <MembershipPlans />
            <BeltJourney />
            <Instructors />
            <Testimonials />
            <RedCTA />
            <FAQ />
        </main>
    );
};
