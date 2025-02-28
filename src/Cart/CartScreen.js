import React, { useState } from "react";
import { View } from "react-native";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import DeliveryAddress from "./DeliveryAddress";
import CheckoutButton from "./CheckoutButton";
import tw from "twrnc";

const cartItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400",
    name: "Lay's Potato Chips",
    description: "Sizzling Hot Spicy Flavor - 48 g",
    price: 20,
    quantity: 1,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400",
    name: "Tomato Local",
    description: "500 g",
    price: 14,
    originalPrice: 24,
    quantity: 1,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400",
    name: "Kurkure Masala Munch",
    description: "75 g",
    price: 20,
    quantity: 1,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400",
    name: "Onion",
    description: "1 kg",
    price: 41,
    originalPrice: 83,
    quantity: 1,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400",
    name: "Maggi Masala Ae Magic",
    description: "72 g",
    price: 60,
    quantity: 1,
  },
];

const CartScreen = () => {
  const [items, setItems] = useState(cartItems);

  const handleIncrement = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <CartHeader savedAmount={111} />
      <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={tw`px-4`}
      renderItem={({ item }) => (
        <CartItem
          image={item.image}
          name={item.name}
          description={item.description}
          price={item.price}
          originalPrice={item.originalPrice}
          quantity={item.quantity}
          onIncrement={() => handleIncrement(item.id)}
          onDecrement={() => handleDecrement(item.id)}
        />
      )}
    />
      <View style={tw`p-4 bg-white border-t border-gray-200`}>
        <DeliveryAddress address="4, Jesus Presence Residence, 2nd A Cross Rd, Zu..." />
        <CheckoutButton onPress={handleCheckout} />
      </View>
    </View>
  );
};

export default CartScreen;