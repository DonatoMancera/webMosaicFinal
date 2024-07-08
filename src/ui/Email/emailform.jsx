'use client'
import { useState, useEffect} from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
export default function EmailForm(){

    const [Email, setEmail] = useState({
        name: "",
        email: "",
        phone: "",
        description: ""
    });
    
    const router = useRouter();
    const params = useParams();
    console.log(params)
    const handleChange  = (event) =>{
        setEmail({
            ... Email,
            [event.target.name]: event.target.value
        })
    }


    const handleSumbit = async (event) =>{
        event.preventDefault();
        try {
            if (!params.id) {
                const res = await axios.post('/api/emails', Email);
                console.log(res.data);
            } else {
                const res = await axios.put(`/api/emails/${params.id}`, Email)
                console.log(res)
            }
            Form.current.reset();
            router.refresh();
            router.push('/Emails')
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!params.id) {
            
            return;
        }
        axios.get(`/api/emails/${params.id}`)
            .then(res => {
                setEmail({
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone,
                    description: res.data.description
                }); 
            })
            .catch(error => {
                console.error('Error fetching email data:', error);
                
            });
    }, [params.id]);

    return (
        <FormContainer>
            <Form action="" className="p-3 mt-3 me-4 text-bg-dark rounded" 
                onSubmit={handleSumbit}>
            <Form.Group>
                <Form.Label htmlFor="fullName" className="mt-3">Full Name</Form.Label>
                <Form.Control 
                type="text" 
                name="name" 
                id="name" 
                onChange={handleChange} 
                value={Email.name}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="email" className="">Email</Form.Label>
                <Form.Control 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Add email" 
                className="" 
                onChange={handleChange} 
                value={Email.email}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="phone" className="">Phone</Form.Label>
                <Form.Control 
                type="tel" 
                name="phone" 
                id="phone" 
                className="" 
                onChange={handleChange} 
                value={Email.phone}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="description" className="">Description</Form.Label>
                <Form.Control
                as="textarea" 
                rows={3} 
                name="description" 
                id="description" 
                className="" 
                onChange={handleChange}
                value={Email.description}
                />
            </Form.Group>
            <Button type="submit" className="mt-3 mb-3 text-light bg-dark">
                Submit
            </Button>
            </Form>
        </FormContainer>
    )
}

const FormContainer = styled.div`
    height: auto;
    width: 75%;
`
