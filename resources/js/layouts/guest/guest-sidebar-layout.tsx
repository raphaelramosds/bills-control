import { PropsWithChildren } from 'react';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { GuestSidebar } from '@/components/guest-sidebar';

export default function GuestSidebarLayout({ children } : PropsWithChildren<{}>) {
    return (
        <AppShell variant="sidebar">
            <GuestSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader/>
                {children}
            </AppContent>
        </AppShell>
    );
}
