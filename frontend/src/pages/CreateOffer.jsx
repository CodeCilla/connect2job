import { useNavigate } from "react-router-dom";
import OfferForm from "../components/profile/OfferForm";
import "../styles/CreateOffer.css";

const CreateOffer = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/profile");
    };

    const handleSuccess = () => {
        navigate("/profile");
    };

    return (
        <div className="create-offer-page">
            <OfferForm
                offer={null}
                isCreating={true}
                onCancel={handleCancel}
                onSuccess={handleSuccess}
            />
        </div>
    );
};

export default CreateOffer;
