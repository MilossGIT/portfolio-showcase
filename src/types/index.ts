import { LucideIcon } from 'lucide-react';

export interface NavLink {
    name: string;
    href: string;
    isExternal?: boolean;
    icon?: LucideIcon;
}

export interface Education {
    school: string;
    degree: string;
    location: string;
    date: string;
    description?: string;
    project?: {
        name: string;
        description: string;
    };
}

export interface Experience {
    title: string;
    company: string;
    location: string;
    date: string;
    description: string[];
    tags: string[];
}

export type ContactFormElements = HTMLFormControlsCollection & {
    name: HTMLInputElement;
    email: HTMLInputElement;
    message: HTMLTextAreaElement;
}

export type ContactFormElement = HTMLFormElement & {
    readonly elements: ContactFormElements;
}