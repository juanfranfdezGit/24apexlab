import { useUI } from "context/UIContext"

export default function Help() {

    const { logOut } = useUI()

    return (
        <>
            <div className="help flex">
                <img onClick={logOut}  src="/assets/interface/logout.png" alt="logout button" />
                <img src="/assets/interface/help.png" alt="help button" />
            </div>
        </>
    )
}