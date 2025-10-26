import { Button } from '@/components/_shared/ui/button';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import { Appearance, useAppearance } from '@/lib/hooks/use-appearance';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';

function SettingsIndex() {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <AppLayout
        //backStack={[{ label: 'Iestatījumi' }]}
        >
            <CentredLayout>
                <div className="m-8 mx-auto flex w-fit gap-2">
                    {tabs.map(({ value, icon: Icon, label }) => (
                        <Button
                            variant={appearance === value ? 'default' : 'outline'}
                            key={value}
                            onClick={() => updateAppearance(value)}
                        >
                            <Icon className="-ml-1 h-4 w-4" />
                            <span className="ml-1.5 text-sm">{label}</span>
                        </Button>
                    ))}
                </div>
            </CentredLayout>
        </AppLayout>
    );
}

export default SettingsIndex;
