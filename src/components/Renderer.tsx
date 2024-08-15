import { Container } from "react-bootstrap";
import { ExampleForm } from "./ExampleForm";

const Renderer = () => {
    const formDefinition = {
        components: [
            {
                type: "textfield",
                label: "First Name",
                key: "firstName",
                input: true,
            },
            {
                type: "textfield",
                label: "Last Name",
                key: "lastName",
                input: true,
            },
            {
                type: "email",
                label: "Email",
                key: "email",
                input: true,
            },
            {
                type: "button",
                action: "Submit",
                label: "Submit",
                theme: "primary",
            },
        ],
    };
    const submissionData = {
        data: {
            firstName: "Joe",
            lastName: "Smith",
            email: "joe@example.com",
        },
    };
    return (
        <Container>
            <ExampleForm
                textContent={`<Form form={${JSON.stringify(
                    formDefinition,
                    null,
                    2,
                )}} />`}
                src={formDefinition}
            />
            <p>
                ...and even populate the form at runtime with submission data.
            </p>

            <ExampleForm
                textContent={`<Form form={${JSON.stringify(
                    formDefinition,
                    null,
                    2,
                )}} submission={${JSON.stringify(submissionData, null, 2)}} />`}
                src={formDefinition}
                submission={submissionData}
            />
        </Container>
    );
};
export default Renderer;
