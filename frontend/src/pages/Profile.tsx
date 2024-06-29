import { useAuthContext } from '../Hooks/useAuthContext'

const Profile = () => {
    const {user} = useAuthContext()

    return (
        user && (
            <div className="max-w-[1300px] m-auto container my-4 mb-10 text-center">
                <h1 className="text-4xl font-bold">My Profile</h1>
                <img className="rounded-full w-[150px] m-auto mt-6" src={user.user.avatar} alt="avtar.png"/>
                <h3 className="mt-6 font-bold text-2xl">{user.user.username}</h3>
            </div>
        )
    )
}
export default Profile