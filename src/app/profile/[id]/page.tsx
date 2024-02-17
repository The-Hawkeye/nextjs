export default function UserProfile({params}:any){
    return (
        <div className=" shadow overflow-hidden sm:rounded-lg">
            <h1>Users Profile</h1>
            <h3>Users Id {params.id}</h3>
        </div>
    )
}