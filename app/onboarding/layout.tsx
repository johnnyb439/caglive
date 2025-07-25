import { OnboardingProvider } from '@/contexts/OnboardingContext';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {children}
      </div>
    </OnboardingProvider>
  );
}