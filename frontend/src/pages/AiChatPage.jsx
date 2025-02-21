import React, { useState } from "react";
import { Button, Form, Card, InputGroup, Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const AiChatPage = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (message.trim() === "") return; // منع إرسال رسائل فارغة

        setMessages([...messages, { id: Date.now(), text: message, sender: "user" }]);
        setMessage(""); // تفريغ حقل الإدخال بعد الإرسال
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <Container fluid className="d-flex flex-column" style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>
                <h1 className="mb-3">AI Chat</h1>

                {/* منطقة الرسائل */}
                <Card className="flex-grow-1 p-3 shadow-sm overflow-auto" style={{ height: "70vh" }}>
                    {messages.map((msg) => (
                        <div key={msg.id} className="mb-2 p-2 rounded bg-light" style={{ width: "fit-content", maxWidth: "75%" }}>
                            {msg.text}
                        </div>
                    ))}
                </Card>

                {/* صندوق الإدخال */}
                <InputGroup className="mt-3">
                    <Form.Control
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="rounded-pill"
                    />
                    <Button variant="primary" onClick={sendMessage} className="rounded-pill ms-2">
                        Send
                    </Button>
                </InputGroup>
            </Container>
        </div>
    );
};

export default AiChatPage;
