import { ScrollView, View } from "react-native"
import GlobalForm from "../GlobalForm";
import tw from "../../tailwind";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { createActualService, createService } from "../redux/slices/AdminSlice";

export const CreateService = ({ serviceId, setIsModalVisible }) => {
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        console.log("data in from", data);
        const response = await dispatch(createActualService(data));
        if (response.payload.success) {
            console.log("Success");
        }
        else {
            console.log("Failed");
        }
        setIsModalVisible(false);
    }
    const fields = [
        { name: "name", label: "Actual Service Name", type: "text", placeholder: "Enter Actual service name", required: true },
        { name: "description", label: "Description", type: "text", placeholder: "Enter description" },
        { name: "actualServiceImages", label: "Upload Images", type: "file" },
        { name: "expert_is_trained_in", label: "Expert Training", type: "text", placeholder: "Comma-separated values" },
        { name: "service_excludes", label: "Service Exclusions", type: "text", placeholder: "Comma-separated values" },
        { name: "what_we_need_from_you", label: "what_we_need_from_you", type: "text", placeholder: "Comma-separated values" },
    ];
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            horizontal={false}
        >
            <GlobalForm
                fields={fields}
                onSubmit={(data) => {
                    // Process comma-separated values into arrays
                    data.expert_is_trained_in = data.expert_is_trained_in.split(",").map((s) => s.trim());
                    data.service_excludes = data.service_excludes.split(",").map((s) => s.trim());
                    data.what_we_need_from_you = data.what_we_need_from_you.split(",").map((s) => s.trim());
                    data.service = serviceId
                    onSubmit(data);
                }}
                buttonText="Create New Actual Service"
            />
        </ScrollView>

    )
}

export const CreateServiceForm = ({ setIsModalVisible }) => {
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        console.log("Submitting service data", data);
        const response = await dispatch(createService(data));
        if (response.payload.success) {
            console.log("Service Created Successfully");
        } else {
            console.log("Service Creation Failed");
        }
        setIsModalVisible(false);
    };

    const fields = [
        { name: "name", label: "Service Name", type: "text", placeholder: "Enter service name", required: true },
        { name: "description", label: "Description", type: "text", placeholder: "Enter description" },
        { name: "images", label: "Upload Images", type: "file" },
        { name: "category", label: "Category ID", type: "text", placeholder: "Enter category ID" },
    ];

    return (
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <GlobalForm
                fields={fields}
                onSubmit={onSubmit}
                buttonText="Create Service"
            />
        </ScrollView>
    );
};

export const ServiceOptionForm = ({ onSubmit }) => {
    const fields = [
        { name: "name", label: "Option Name", type: "text", placeholder: "Enter option name", required: true },
        { name: "price", label: "Price", type: "text", placeholder: "Enter price", required: true },
        { name: "discount_price", label: "Discount Price", type: "text", placeholder: "Enter discount price" },
        { name: "upto", label: "Discount Upto", type: "text", placeholder: "Enter discount limit" },
        {
            name: "discount_type",
            label: "Discount Type",
            type: "dropdown",
            options: [
                { label: "Flat", value: "flat" },
                { label: "Percent", value: "percent" },
            ],
            placeholder: "Select discount type",
        },
        { name: "description", label: "Description", type: "text", placeholder: "Enter description" },
        { name: "images", label: "Upload Images", type: "file" }
    ];

    if (loading) {
        return <ActivityIndicator size="large" color="blue" />;
    }

    return (
        <View style={tw`flex-1 bg-white p-6`}>
            <GlobalForm
                fields={fields}
                onSubmit={(data) => {
                    // Ensure numeric fields are properly converted
                    data.price = parseFloat(data.price);
                    data.discount_price = parseFloat(data.discount_price) || 0;
                    data.upto = parseFloat(data.upto) || 0;
                    data.rating = parseFloat(data.rating) || 0;

                    onSubmit(data);
                }}
                buttonText="Save Service Option"
            />
        </View>
    );
};
