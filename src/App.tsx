import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "http://ec2-35-180-152-154.eu-west-3.compute.amazonaws.com:8080/api/users"
                );
                console.log("Risposta GET:", response);

                if (response.data) {
                    setUsers(response.data);
                } else {
                    setError("Risposta senza dati");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(
                        "Errore Axios:",
                        error.response?.status,
                        error.response?.data
                    );
                } else {
                    console.error(
                        "Errore durante il recupero degli utenti:",
                        error
                    );
                }

                setError("Errore durante il recupero degli utenti");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="page">
            <div>
                <h1 className="title">Prova: AWS</h1>

                <div className="mx-auto">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white text-black shadow-2xl rounded-xl overflow-hidden mb-4"
                        >
                            <div className="flex justify-between items-center p-3 text-xl font-bold">
                                <div>{user.firstName}</div>
                                <div>{user.lastName}</div>
                                <div>{user.email}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
