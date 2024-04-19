import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div>admin Header</div>
            {children}
            <div>admin footer</div>
        </div>
    )
}
export default Layout;