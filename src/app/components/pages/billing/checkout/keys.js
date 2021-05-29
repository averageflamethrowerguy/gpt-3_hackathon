import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51HIkRICaG9pz7GtYHVPlO2zkfcdrOf6YbF5ebZHY3qqiEI6rByFSLM9094CfabuzL0aDos2IrIQTQL0ez1v6hbmz00G0HsbDz4");
// const stripePromise = loadStripe("pk_live_51HIkRICaG9pz7GtYw6yHrereWgxblWTFHAbgHXrpsAGLedYUoqCXMYJd62ml80Oa9Og70Zl8rK6E3ibFwAHvt3Pe001rEjtIAA");

export default stripePromise
