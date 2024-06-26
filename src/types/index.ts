import React from "react";

export type IcontextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;


};
export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};

export type IUpdateUser = {
    userId: string;
    name: string;
    username: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
};

export type INewPost = {
    userId: string;
    title: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
    search?: string;
};

export type IUpdatePost = {

    postId: string;
    title: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
    search?: string;
};

export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
};

export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
};
export type INewCommunity = {
    name: string;
};
