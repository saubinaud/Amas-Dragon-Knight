import { type FC } from 'react';
import { TrialHero } from './components/TrialHero';
import { ProcessSteps } from './components/ProcessSteps';
import { WhatIncludes } from './components/WhatIncludes';
import { TrialForm } from './components/TrialForm';
import { MiniFAQ } from './components/MiniFAQ';
import { SocialProof } from './components/SocialProof';

export const TrialClassPage: FC = () => {
    return (
        <main className="bg-dk-black min-h-screen">
            <TrialHero />
            <ProcessSteps />
            <WhatIncludes />
            <TrialForm />
            <MiniFAQ />
            <SocialProof />
        </main>
    );
};
