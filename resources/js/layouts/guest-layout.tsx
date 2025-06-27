import GuestSidebarTemplate from '@/layouts/guest/guest-sidebar-layout';
import { type ReactNode } from 'react';

interface GuestLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: GuestLayoutProps) => (
    <GuestSidebarTemplate {...props} >
        {children}
    </GuestSidebarTemplate>
);
