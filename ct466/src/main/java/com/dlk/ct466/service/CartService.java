package com.dlk.ct466.service;

import com.dlk.ct466.domain.entity.Cart;
import com.dlk.ct466.domain.entity.User;
import com.dlk.ct466.repository.CartRepository;
import com.dlk.ct466.repository.UserRepository;
import com.dlk.ct466.util.error.IdInvalidException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    public Cart getCartById(String id) throws IdInvalidException {
        return cartRepository.findById(id).orElseThrow(
                () -> new IdInvalidException("Cart with id: " + id + " not found")
        );
    }

    public Cart createCart(Cart cart) throws IdInvalidException {
        if (cart.getUser() == null || cart.getUser().getUserId() == null) {
            throw new IdInvalidException("User cannot be null or empty");
        }

        User user = userRepository.findById(cart.getUser().getUserId())
                .orElseThrow(() -> new IdInvalidException("User with id: " + cart.getUser().getUserId() + " not found"));

        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public Cart updateCart(Cart cart, String id) throws IdInvalidException {
        Cart dbCart = getCartById(id);

        if (cart.getUser() != null && cart.getUser().getUserId() != null) {
            User user = userRepository.findById(cart.getUser().getUserId())
                    .orElseThrow(() -> new IdInvalidException("User with id: " + cart.getUser().getUserId() + " not found"));
            dbCart.setUser(user);
        } else {
            throw new IdInvalidException("User cannot be null or empty");
        }

        return cartRepository.save(dbCart);
    }

    public Cart getCartByUserId(String userId) throws IdInvalidException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IdInvalidException("User with id: " + userId + " not found"));

        return cartRepository.findByUserUserId(user.getUserId()).orElseThrow(
                () -> new IdInvalidException("Cart for user id: " + userId + " not found")
        );
    }
}
