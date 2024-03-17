import {
    TextInput,
    Checkbox,
    Paper,
    Title,
    Text,
    Container,
    Button,
    Center,
} from '@mantine/core';
import classes from './signupComponent.module.css';
import { useState } from 'react';
import { useForm } from '@mantine/form';

export function SignUpComponent() {
    const [displayError, setDisplayError] = useState(false)
    const [displaySuccess, setDisplaySuccess] = useState(false)
    const [displayLoading, setDisplayLoading] = useState(false)
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    const form = useForm({
        initialValues: {
            username: "",
            first_name: "",
            last_name: "",
            company: "",
            job_title: "",
            email: "",
        },

        validate: {
            username: (value) => (value.length >= 8 ? null : "Username must be at least 8 characters long"),
            email: (value) => (pattern.test(value) ? null : "Invalid email")
        }
    })

    return (
        <Container size={480} my={40}>
            <Title ta="center" className={classes.title}>
                Sign up for the hackathon!
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(async (values) => {
                    // reset error and success messages
                    setDisplayError(false)
                    setDisplaySuccess(false)
                    setDisplayLoading(true)
                    // console.log(values)

                    const response = await fetch('/api/users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values)
                    });
                    // console.log(await response.json())

                    setDisplayLoading(false)

                    if (response.status === 200) {
                        setDisplaySuccess(true)
                    } else {
                        setDisplayError(true)
                    }
                })}>
                    <TextInput label="Username" placeholder="Username" required {...form.getInputProps("username")} />
                    <TextInput label="First Name" placeholder="Max" required my={"md"} {...form.getInputProps("first_name")} />
                    <TextInput label="Last Name" placeholder="Mustermann" required my={"md"} {...form.getInputProps("last_name")} />
                    <TextInput label="Email" placeholder="you@gmail.com" required my={"md"} {...form.getInputProps("email")} />
                    <TextInput label="Company" placeholder="Company" required my={"md"} {...form.getInputProps("company")} />
                    <TextInput label="Job" placeholder="Job Title" required my={"md"} {...form.getInputProps("job_title")} />
                    <Checkbox label="I agree you to sell my data" my="md" />
                    <Center>
                        {displaySuccess && (<Text c="green" mb="xl">You signed up successfully!</Text>)}
                        {displayError && (<Text c="red" mb="xl">There was an error!</Text>)}
                        {displayLoading && (<Text c="yellow" mb="xl">Loading...</Text>)}
                    </Center>
                    <Button fullWidth type="submit">
                        Sign up
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}