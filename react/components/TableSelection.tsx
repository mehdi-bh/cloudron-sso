import { useEffect, useState } from 'react';
import { Table, ScrollArea, Text, rem, Container, Center, Space, Flex, Button, ActionIcon, Title } from '@mantine/core';
import classes from './TableSelection.module.css';
import { IconCheck, IconX } from '@tabler/icons-react';

// const data = [
//     {
//         id: '1',
//         first_name: 'Robert',
//         last_name: 'Wolfkisser',
//         company: 'Wolfkisser Inc.',
//         job: 'Engineer',
//         email: 'rob_wolf@gmail.com',
//     },
//     {
//         id: '2',
//         first_name: 'Robert',
//         last_name: 'Wolfkisser',
//         company: 'Wolfkisser Inc.',
//         job: 'Engineer',
//         email: 'rob_wolf@gmail.com',
//     },
//     {
//         id: '3',
//         first_name: 'Robert',
//         last_name: 'Wolfkisser',
//         company: 'Wolfkisser Inc.',
//         job: 'Engineer',
//         email: 'rob_wolf@gmail.com',
//     },
// ];
interface User {
    id: string;
    firstname: string;
    lastname: string;
    company: string;
    job_title: string;
    email: string;
    status: string;
}



export function TableSelection() {
    const [filter, setFilter] = useState("pending");
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            // const response = await fetch(`http://127.0.0.1:3005/api/users/${filter}`);
            const response = await fetch(`/api/users/${filter}`);
            const data = await response.json();
            setUsers(data["users"]);
        } catch (error) {
            console.error(`Failed to fetch ${filter} users:`, error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [filter]);

    const updateUserStatus = async (id: any, status: any) => {
        try {
            // const response = await fetch(`http://127.0.0.1:3005/api/users/${status}/${id}`, { method: 'PUT' });
            const response = await fetch(`/api/users/${status}/${id}`, { method: 'PUT' });
            const data = await response.json();
            fetchUsers();
        } catch (error) {
            console.error(`Failed to ${status} user:`, error);
        }
    };

    const rows = users.map((item) => {
        return (
            <Table.Tr key={item.id}>
                <Table.Td>{item.firstname}</Table.Td>
                <Table.Td>{item.lastname}</Table.Td>
                <Table.Td>{item.company}</Table.Td>
                <Table.Td>{item.job_title}</Table.Td>
                <Table.Td>{item.email}</Table.Td>
                <Table.Td>
                    <Flex gap="md">
                        {item.status == "pending" ?
                            <>
                                <ActionIcon variant="filled" color="red" radius="md" onClick={() => { updateUserStatus(item.id, "rejected") }} >
                                    <IconX />
                                </ActionIcon>
                                <ActionIcon variant="filled" color="green" radius="md" onClick={() => { updateUserStatus(item.id, "approved") }}>
                                    <IconCheck />
                                </ActionIcon>
                            </>
                            : <Text c="gray">{item.status}</Text>}

                    </Flex>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <Container>
            <Space h="5vh" />
            <Title ta="center" className={classes.title}>
                Admin page
            </Title>
            <Space h="5vh" />
            <Center>
                <Flex gap="md">
                    <Button onClick={() => {
                        fetchUsers();
                        setFilter("pending")
                    }}>Pending</Button>
                    <Button onClick={() => { setFilter("approved") }}>Approved</Button>
                    <Button onClick={() => { setFilter("rejected") }}>Rejected</Button>
                </Flex>
            </Center>
            <Text ta={"center"} mt={"lg"}>{filter}</Text>
            <Space h="5vh" />
            <Space h="5vh" />

            <ScrollArea>
                <Table miw={800} verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Vorname</Table.Th>
                            <Table.Th>Nachname</Table.Th>
                            <Table.Th>Unternehmen</Table.Th>
                            <Table.Th>Job</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th style={{ width: rem(40) }}>
                                <Center>
                                    Status
                                </Center>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Container>

    );
}