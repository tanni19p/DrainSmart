import AuthForm from "../components/AuthForm";

const CitizenPage = ({ onLogin }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Citizen Portal</h2>

      <AuthForm
        role="Citizen"
        onAuthSuccess={onLogin}
      />
    </div>
  );
};

export default CitizenPage;




