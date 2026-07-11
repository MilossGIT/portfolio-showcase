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

export interface GitHubProject {
    name: string;
    description: string | null;
    htmlUrl: string;
    language: string | null;
    stars: number;
    topics: string[];
    updatedAt: string;
    homepage: string | null;
    previewImage: string;
    featured?: boolean;
}

export interface WorkHighlight {
    title: string;
    company: string;
    description: string;
    tags: string[];
    impact: string;
    url?: string;
    image?: string;
}

export type ContactFormElements = HTMLFormControlsCollection & {
    name: HTMLInputElement;
    email: HTMLInputElement;
    message: HTMLTextAreaElement;
}

export type ContactFormElement = HTMLFormElement & {
    readonly elements: ContactFormElements;
}
