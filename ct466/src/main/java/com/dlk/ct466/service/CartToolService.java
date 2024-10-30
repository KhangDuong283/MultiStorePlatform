package com.dlk.ct466.service;

import com.dlk.ct466.domain.entity.Cart;
import com.dlk.ct466.domain.entity.CartTool;
import com.dlk.ct466.domain.entity.Tool;
import com.dlk.ct466.domain.response.ResPaginationDTO;
import com.dlk.ct466.repository.CartToolRepository;
import com.dlk.ct466.repository.ToolRepository;
import com.dlk.ct466.util.PaginationUtil;
import com.dlk.ct466.util.error.IdInvalidException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartToolService {
    private final CartToolRepository cartToolRepository;
    private final ToolRepository toolRepository;
    private final CartService cartService;

    public CartTool getCartToolById(long id) throws IdInvalidException {
        return cartToolRepository.findById(id).orElseThrow(
                () -> new IdInvalidException("CartTool with id: " + id + " not found"));
    }

    @Transactional
    public CartTool createCartTool(CartTool cartTool) throws IdInvalidException {
        if (cartTool.getCart() == null || cartTool.getCart().getCartId() == null) {
            throw new IdInvalidException("Cart ID cannot be null");
        }
        Cart cart = cartService.getCartById(cartTool.getCart().getCartId());
        cartTool.setCart(cart);

        if (cartTool.getTool() == null || cartTool.getTool().getToolId() == 0) {
            throw new IdInvalidException("Tool ID cannot be null or zero");
        }
        Tool tool = toolRepository.findById(cartTool.getTool().getToolId())
                .orElseThrow(() -> new IdInvalidException("Tool with id: " + cartTool.getTool().getToolId() + " not found"));
        cartTool.setTool(tool);

        return cartToolRepository.save(cartTool);
    }

    @Transactional
    public CartTool updateCartTool(long id, CartTool cartTool) throws IdInvalidException {
        CartTool dbCartTool = getCartToolById(id);

        if (cartTool.getCart() != null && cartTool.getCart().getCartId() != null) {
            Cart cart = cartService.getCartById(cartTool.getCart().getCartId());
            dbCartTool.setCart(cart);
        }

        if (cartTool.getTool() != null && cartTool.getTool().getToolId() != 0) {
            Tool tool = toolRepository.findById(cartTool.getTool().getToolId())
                    .orElseThrow(() -> new IdInvalidException("Tool with id: " + cartTool.getTool().getToolId() + " not found"));
            dbCartTool.setTool(tool);
        }

        dbCartTool.setQuantity(cartTool.getQuantity());
        return cartToolRepository.save(dbCartTool);
    }

    public ResPaginationDTO getAllCartTools(Pageable pageable) {
        Page<CartTool> pageCartTool = cartToolRepository.findAll(pageable);
        return PaginationUtil.getPaginatedResult(pageCartTool, pageable);
    }
}
