import { useState, useEffect } from 'react'
import { Table } from '../components'
import { TableDetail } from '../components'


const ListUsers = () => {
    const [user, setUser] = useState(null)

    if (user) {
        return <TableDetail user={user} setUser={setUser} />
    }

    return (
        <>
            <Table setUser={setUser} />
        </>
    )
}

export default ListUsers;