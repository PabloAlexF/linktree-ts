import type { ReactNode } from "react";

interface SocialProps{
    url: string;
    children: ReactNode;
}

export function Social({url,children}: SocialProps) {
    return (
        <a target="_blank" rel="noopener noreferrer" href={url}>
            {children}
        </a>
    );
}