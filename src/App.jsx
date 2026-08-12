import { useState, useEffect, useRef } from "react";
import {
  Search, Bell, Home as HomeIcon, ClipboardList, User, Plus, Minus, Trash2,
  Star, ChevronLeft, Settings, Heart, HelpCircle,
  Upload, Edit2, X, Check, Coffee, UtensilsCrossed, Moon, IceCream2,
  Utensils, ShoppingBag
} from "lucide-react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Pacifico&display=swap');

:root{
  --coral:#F1685C;
  --coral-dark:#D9483D;
  --coral-light:#FBD4CE;
  --coral-pale:#FDEEEC;
  --ink:#2B211D;
  --muted:#9C8C85;
  --line:#F2E4E1;
  --white:#FFFFFF;
  --gold:#F0A93C;
}

.rk-shell{
  font-family:'Nunito',sans-serif;
  background:#EFE4DE;
  min-height:100%;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  padding:22px 10px;
  box-sizing:border-box;
}
.rk-phone{
  width:390px;
  max-width:100%;
  min-height:760px;
  background:var(--white);
  border-radius:34px;
  overflow:hidden;
  box-shadow:0 30px 60px rgba(43,33,29,0.22);
  position:relative;
  display:flex;
  flex-direction:column;
}
.rk-screen{
  flex:1;
  display:flex;
  flex-direction:column;
  overflow-y:auto;
}
.rk-content{ flex:1; padding:20px 20px 8px; }

/* Splash */
.rk-splash{
  flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
  background:linear-gradient(160deg,#F1685C 0%,#E85347 55%,#D9483D 100%);
  color:#fff; text-align:center; padding:40px;
}
.rk-bowl{ margin-bottom:22px; }
.rk-logo-word{
  font-family:'Pacifico',cursive; font-size:34px; font-weight:400; color:#fff;
}

.rk-intro{
  flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
  padding:40px 34px; text-align:center; cursor:pointer;
}
.rk-intro-art{
  width:210px; height:210px; border-radius:50%;
  background:radial-gradient(circle at 35% 30%, #F98276, #D9483D 75%);
  display:flex; align-items:center; justify-content:center; margin-bottom:26px;
  font-size:74px;
}
.rk-intro h2{ font-size:23px; font-weight:800; color:var(--ink); margin:0 0 8px; line-height:1.3; }
.rk-intro p{ font-size:13px; color:var(--muted); margin:0; }
.rk-tap-hint{ margin-top:30px; font-size:11.5px; color:var(--coral); font-weight:700; letter-spacing:.04em; }

/* Login */
.rk-login-wrap{ flex:1; display:flex; flex-direction:column; padding:36px 26px 24px; }
.rk-login-card h1{ font-size:22px; font-weight:800; text-align:center; margin:0 0 22px; }
.rk-login-error{
  background:#FBDFDA; color:#B84438; border:1.5px solid #F3B7AC; border-radius:12px;
  padding:9px 13px; font-size:12.5px; font-weight:700; text-align:center; margin-bottom:14px;
}
.rk-field{ margin-bottom:14px; }
.rk-field label{ font-size:11.5px; font-weight:700; color:var(--muted); display:block; margin-bottom:6px; }
.rk-field input{
  width:100%; box-sizing:border-box; border:1.5px solid var(--line); background:#FAF6F4;
  border-radius:12px; padding:11px 13px; font-family:'Nunito',sans-serif; font-size:14px; outline:none;
}
.rk-field input:focus{ border-color:var(--coral); }
.rk-remember{ display:flex; align-items:center; gap:7px; font-size:12.5px; color:var(--muted); margin:2px 0 18px; }
.rk-role-row{ display:flex; gap:10px; margin-bottom:20px; }
.rk-role-btn{
  flex:1; background:var(--coral); color:#fff; border:none; border-radius:24px;
  padding:11px 0; font-weight:800; font-size:13px; cursor:pointer;
}
.rk-role-btn:hover{ background:var(--coral-dark); }
.rk-role-btn.secondary{ background:var(--coral-dark); }
.rk-divider{ display:flex; align-items:center; gap:10px; color:var(--muted); font-size:11.5px; margin:6px 0 16px; }
.rk-divider::before, .rk-divider::after{ content:""; flex:1; height:1px; background:var(--line); }
.rk-social-row{ display:flex; flex-direction:column; gap:9px; margin-bottom:20px; }
.rk-social-btn{
  border:1.5px solid var(--line); background:#fff; border-radius:24px; padding:10px 0;
  font-weight:700; font-size:13px; color:var(--ink); cursor:pointer;
}
.rk-social-btn:hover{ background:#FAF6F4; }
.rk-cta{
  background:var(--coral); color:#fff; border:none; border-radius:24px; padding:13px 0;
  font-weight:800; font-size:14.5px; cursor:pointer; margin-bottom:10px;
}
.rk-cta:hover{ background:var(--coral-dark); }
.rk-cta.ghost{ background:var(--coral-pale); color:var(--coral-dark); }
.rk-login-footer{ text-align:center; margin-top:auto; padding-top:18px; }

/* Header bar */
.rk-topbar{ display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
.rk-topbar h2{ font-size:19px; font-weight:800; margin:0; }
.rk-bell{
  width:36px; height:36px; border-radius:50%; background:var(--coral-pale);
  display:flex; align-items:center; justify-content:center; color:var(--coral-dark); cursor:pointer;
}
.rk-search{
  display:flex; align-items:center; gap:8px; background:#F6EFEC; border-radius:14px;
  padding:11px 14px; margin-bottom:18px;
}
.rk-search input{ border:none; background:transparent; outline:none; font-size:13.5px; flex:1; font-family:'Nunito',sans-serif; }

/* Home */
.rk-promo{
  background:linear-gradient(120deg,#F1685C,#E8574B); border-radius:18px; padding:18px;
  color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:14px; position:relative;
  box-shadow:0 10px 24px rgba(217,72,61,0.28);
}
.rk-banner-edit{
  position:absolute; top:10px; right:10px; width:28px; height:28px; border-radius:50%;
  background:rgba(43,33,29,0.55); color:#fff; border:none; display:flex; align-items:center;
  justify-content:center; cursor:pointer;
}
.rk-banner-edit:hover{ background:rgba(43,33,29,0.75); }
.rk-promo-emoji{ font-size:44px; }
.rk-promo strong{ display:block; font-size:19px; font-weight:900; }
.rk-promo span{ font-size:12.5px; opacity:.9; }
.rk-special{
  background:var(--coral-light); border-radius:18px; padding:16px; margin-bottom:22px;
  display:flex; align-items:center; gap:14px; cursor:pointer;
  box-shadow:0 8px 20px rgba(241,104,92,0.18);
}
.rk-special-emoji{
  width:60px; height:60px; border-radius:14px; background:#fff;
  display:flex; align-items:center; justify-content:center; font-size:30px; flex-shrink:0; overflow:hidden;
}
.rk-special-emoji img{ width:100%; height:100%; object-fit:cover; }
.rk-special strong{ font-size:14.5px; font-weight:800; color:var(--coral-dark); display:block; }
.rk-section-label{ font-size:13px; font-weight:800; letter-spacing:.06em; color:var(--ink); margin:0 0 12px; text-transform:uppercase; }
.rk-top-row{ display:flex; gap:12px; overflow-x:auto; padding-bottom:10px; }
.rk-top-item{ flex-shrink:0; width:78px; text-align:center; cursor:pointer; }
.rk-top-thumb{
  width:78px; height:78px; border-radius:16px; overflow:hidden; margin-bottom:6px;
  background:var(--coral-pale); display:flex; align-items:center; justify-content:center; font-size:32px;
  box-shadow:0 6px 14px rgba(43,33,29,0.1);
}
.rk-top-thumb img{ width:100%; height:100%; object-fit:cover; }
.rk-top-item span{ font-size:11px; font-weight:700; color:var(--ink); }

/* Menu */
.rk-cats{ display:flex; gap:10px; margin-bottom:18px; }
.rk-cat-btn{
  flex:1; display:flex; flex-direction:column; align-items:center; gap:6px; padding:12px 4px;
  border-radius:16px; background:#F6EFEC; border:1.5px solid transparent; cursor:pointer; color:var(--muted);
}
.rk-cat-btn.active{ background:var(--coral); color:#fff; }
.rk-cat-btn span{ font-size:10px; font-weight:800; letter-spacing:.02em; }
.rk-dish-card{
  display:flex; gap:12px; background:#fff; border:1.5px solid var(--line); border-radius:16px;
  padding:10px; margin-bottom:12px; position:relative;
  box-shadow:0 6px 16px rgba(43,33,29,0.06);
}
.rk-dish-thumb{
  width:70px; height:70px; border-radius:12px; overflow:hidden; flex-shrink:0;
  background:var(--coral-pale); display:flex; align-items:center; justify-content:center; font-size:30px;
}
.rk-dish-thumb img{ width:100%; height:100%; object-fit:cover; }
.rk-dish-info{ flex:1; min-width:0; }
.rk-dish-info h4{ font-size:13.5px; font-weight:800; margin:0 0 3px; }
.rk-dish-local{ font-size:11.5px; color:var(--muted); font-weight:600; }
.rk-dish-desc{ font-size:11.5px; color:var(--muted); margin:4px 0 6px; line-height:1.4; }
.rk-dish-foot{ display:flex; align-items:center; justify-content:space-between; }
.rk-rating{ display:flex; align-items:center; gap:3px; font-size:11.5px; font-weight:800; color:var(--gold); }
.rk-add-btn{
  width:26px; height:26px; border-radius:50%; background:var(--coral); color:#fff; border:none;
  display:flex; align-items:center; justify-content:center; cursor:pointer;
}
.rk-add-btn:hover{ background:var(--coral-dark); }

/* Order / cart */
.rk-cart-row{
  display:flex; gap:12px; background:#fff; border:1.5px solid var(--line); border-radius:16px;
  padding:10px; margin-bottom:12px; align-items:center;
  box-shadow:0 6px 16px rgba(43,33,29,0.06);
}
.rk-qty-controls{ display:flex; align-items:center; gap:8px; margin-top:6px; }
.rk-qty-btn{
  width:24px; height:24px; border-radius:8px; border:1.5px solid var(--line); background:#fff;
  display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--coral-dark);
}
.rk-qty-num{ font-size:12.5px; font-weight:800; min-width:14px; text-align:center; }
.rk-pref-toggle-link{
  background:none; border:none; color:var(--coral-dark); font-size:11px; font-weight:800;
  cursor:pointer; margin-left:6px; padding:0;
}
.rk-pref-grid{ display:grid; grid-template-columns:1fr 1fr; gap:8px; margin:16px 0 20px; }
.rk-pref-chip{
  display:flex; align-items:center; gap:7px; font-size:12px; color:var(--ink); font-weight:600;
  padding:8px 10px; border:1.5px solid var(--line); border-radius:10px; cursor:pointer; background:#fff;
}
.rk-pref-chip.checked{ border-color:var(--coral); background:var(--coral-pale); color:var(--coral-dark); }
.rk-checkbox{
  width:15px; height:15px; border-radius:4px; border:1.5px solid var(--line);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.rk-pref-chip.checked .rk-checkbox{ background:var(--coral); border-color:var(--coral); color:#fff; }
.rk-checkout-btn{
  background:var(--coral); color:#fff; border:none; border-radius:22px; padding:14px 0;
  width:100%; font-weight:800; font-size:14.5px; cursor:pointer; margin-top:6px;
}
.rk-checkout-btn:hover{ background:var(--coral-dark); }

.rk-order-card{
  background:#fff; border:1.5px solid var(--line); border-radius:18px; padding:16px; margin-bottom:20px;
  display:flex; gap:14px;
  box-shadow:0 8px 20px rgba(43,33,29,0.07);
}
.rk-order-thumb{
  width:64px; height:64px; border-radius:12px; background:var(--coral-pale); flex-shrink:0;
  display:flex; align-items:center; justify-content:center; font-size:26px; overflow:hidden;
}
.rk-order-thumb img{ width:100%; height:100%; object-fit:cover; }
.rk-order-meta strong{ font-size:14px; }
.rk-order-meta div{ font-size:11.5px; color:var(--muted); margin-top:3px; }
.rk-status-pill{
  display:inline-block; margin-top:6px; font-size:10.5px; font-weight:800; color:var(--coral-dark);
  background:var(--coral-pale); border-radius:20px; padding:3px 10px;
}
.rk-status-pill.cancelled{ background:#EEE6E1; color:var(--muted); }
.rk-stepper{ display:flex; align-items:center; justify-content:space-between; margin:8px 0 22px; }
.rk-step{ flex:1; text-align:center; position:relative; }
.rk-step-dot{
  width:16px; height:16px; border-radius:50%; background:var(--line); margin:0 auto 6px;
  border:3px solid #fff; box-shadow:0 0 0 2px var(--line);
}
.rk-step.done .rk-step-dot{ background:var(--coral); box-shadow:0 0 0 2px var(--coral); }
.rk-step span{ font-size:9.5px; font-weight:700; color:var(--muted); }
.rk-step.done span{ color:var(--coral-dark); }
.rk-step-line{ position:absolute; top:8px; left:-50%; width:100%; height:2px; background:var(--line); z-index:-1; }
.rk-step.done .rk-step-line{ background:var(--coral); }
.rk-history-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:20px; }
.rk-history-thumb{
  aspect-ratio:1; border-radius:14px; background:var(--coral-pale); overflow:hidden;
  display:flex; align-items:center; justify-content:center; font-size:24px; cursor:pointer;
  box-shadow:0 6px 14px rgba(43,33,29,0.1);
}
.rk-history-thumb img{ width:100%; height:100%; object-fit:cover; }
.rk-cancelled-badge{
  position:absolute; inset:0; background:rgba(43,33,29,0.55); color:#fff; font-size:9px; font-weight:800;
  display:flex; align-items:center; justify-content:center; text-align:center;
}
.rk-feedback-bar{
  background:var(--coral); border-radius:16px; padding:14px 16px; display:flex; align-items:center;
  justify-content:space-between; color:#fff;
}
.rk-feedback-bar span{ font-size:12.5px; font-weight:700; }
.rk-emoji-row{ display:flex; gap:8px; }
.rk-emoji-row button{ background:none; border:none; font-size:19px; cursor:pointer; opacity:.85; }
.rk-emoji-row button.picked{ opacity:1; transform:scale(1.2); }

.rk-empty{ text-align:center; padding:70px 20px; color:var(--muted); }
.rk-empty-emoji{ font-size:44px; margin-bottom:12px; }
.rk-empty p{ font-size:13.5px; margin-bottom:18px; }
.rk-empty button{
  background:var(--coral); color:#fff; border:none; border-radius:22px; padding:11px 24px;
  font-weight:800; font-size:13px; cursor:pointer;
}

/* Profile */
.rk-avatar-block{ text-align:center; padding:6px 0 22px; }
.rk-avatar-edit{ position:relative; width:84px; margin:0 auto 12px; cursor:pointer; }
.rk-avatar{
  width:84px; height:84px; border-radius:50%; background:var(--coral-pale); margin:0 auto;
  display:flex; align-items:center; justify-content:center; font-size:34px; color:var(--coral-dark);
  overflow:hidden; box-shadow:0 8px 18px rgba(43,33,29,0.14);
}
.rk-avatar img{ width:100%; height:100%; object-fit:cover; }
.rk-avatar-cam{
  position:absolute; bottom:0; right:0; width:26px; height:26px; border-radius:50%;
  background:var(--coral); color:#fff; display:flex; align-items:center; justify-content:center;
  border:2px solid #fff;
}
.rk-avatar-block strong{ font-size:16px; display:block; }
.rk-role-tag{ font-size:11.5px; color:var(--muted); font-weight:700; margin-top:2px; }
.rk-email{ font-size:11.5px; color:var(--muted); margin-top:2px; }
.rk-hearts-stat{
  display:inline-block; margin-top:10px; background:var(--coral-pale); color:var(--coral-dark);
  font-weight:800; font-size:12.5px; padding:6px 16px; border-radius:20px;
}
.rk-nav-list{ display:flex; flex-direction:column; }
.rk-nav-row{
  display:flex; align-items:center; gap:12px; padding:13px 4px; border-bottom:1px solid var(--line);
  font-size:13.5px; font-weight:700; color:var(--ink); cursor:pointer;
}
.rk-nav-row:hover{ color:var(--coral-dark); }
.rk-nav-row .rk-icon-wrap{
  width:32px; height:32px; border-radius:10px; background:var(--coral-pale); color:var(--coral-dark);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.rk-manage-btn{
  width:100%; background:var(--ink); color:#fff; border:none; border-radius:16px; padding:13px 0;
  font-weight:800; font-size:13.5px; cursor:pointer; margin:18px 0 4px; display:flex;
  align-items:center; justify-content:center; gap:8px;
}
.rk-logout-btn{
  width:100%; background:var(--coral); color:#fff; border:none; border-radius:22px; padding:13px 0;
  font-weight:800; font-size:14px; cursor:pointer; margin-top:20px;
}

/* Bottom nav */
.rk-bottomnav{
  display:flex; border-top:1px solid var(--line); padding:9px 6px 14px; background:#fff;
}
.rk-nav-btn{
  flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; background:none; border:none;
  color:var(--muted); cursor:pointer; padding:4px 0;
}
.rk-nav-btn.active{ color:var(--coral); }
.rk-nav-btn span{ font-size:9.5px; font-weight:800; }
.rk-cart-badge{
  position:absolute; top:-4px; right:14px; background:var(--coral-dark); color:#fff;
  font-size:9px; font-weight:800; width:15px; height:15px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
}
.rk-nav-btn-wrap{ position:relative; flex:1; }

/* Admin */
.rk-admin-header{
  display:flex; align-items:center; gap:10px; padding:20px; border-bottom:1px solid var(--line);
}
.rk-admin-header h2{ font-size:17px; font-weight:800; margin:0; flex:1; }
.rk-back-btn{
  width:34px; height:34px; border-radius:50%; background:#F6EFEC; border:none; cursor:pointer;
  display:flex; align-items:center; justify-content:center; color:var(--ink);
}
.rk-admin-add{
  background:var(--coral); color:#fff; border:none; border-radius:14px; padding:8px 14px;
  font-weight:800; font-size:12px; cursor:pointer; display:flex; align-items:center; gap:6px;
}
.rk-admin-list{ padding:16px 20px; }
.rk-admin-row{
  display:flex; align-items:center; gap:12px; background:#fff; border:1.5px solid var(--line);
  border-radius:14px; padding:10px; margin-bottom:10px;
  box-shadow:0 6px 16px rgba(43,33,29,0.06);
}
.rk-admin-thumb{
  width:52px; height:52px; border-radius:10px; background:var(--coral-pale); flex-shrink:0;
  display:flex; align-items:center; justify-content:center; font-size:22px; overflow:hidden;
}
.rk-admin-thumb img{ width:100%; height:100%; object-fit:cover; }
.rk-admin-row-info{ flex:1; min-width:0; }
.rk-admin-row-info strong{ font-size:12.5px; display:block; }
.rk-admin-tags{ display:flex; gap:5px; margin-top:4px; flex-wrap:wrap; }
.rk-tag{ font-size:9px; font-weight:800; background:#F6EFEC; color:var(--muted); border-radius:8px; padding:2px 7px; text-transform:capitalize; }
.rk-tag.special{ background:var(--coral-pale); color:var(--coral-dark); }
.rk-admin-actions{ display:flex; gap:6px; }
.rk-admin-icon-btn{
  width:30px; height:30px; border-radius:9px; border:1.5px solid var(--line); background:#fff;
  display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--muted);
}
.rk-admin-icon-btn:hover{ background:#F6EFEC; color:var(--ink); }
.rk-admin-icon-btn.confirm{ background:var(--coral); border-color:var(--coral); color:#fff; }

.rk-form-overlay{
  position:absolute; inset:0; background:rgba(43,33,29,0.4); display:flex; align-items:flex-end; z-index:20;
}
.rk-form-sheet{
  background:#fff; border-radius:24px 24px 0 0; padding:22px 22px 26px; width:100%;
  max-height:88%; overflow-y:auto; box-sizing:border-box;
  box-shadow:0 -10px 30px rgba(43,33,29,0.22);
}
.rk-form-sheet h3{ font-size:16px; font-weight:800; margin:0 0 16px; }
.rk-form-row{ margin-bottom:12px; }
.rk-form-row label{ font-size:11.5px; font-weight:700; color:var(--muted); display:block; margin-bottom:5px; }
.rk-form-row input, .rk-form-row textarea, .rk-form-row select{
  width:100%; box-sizing:border-box; border:1.5px solid var(--line); background:#FAF6F4;
  border-radius:11px; padding:10px 12px; font-family:'Nunito',sans-serif; font-size:13.5px; outline:none;
}
.rk-form-row textarea{ min-height:60px; resize:vertical; }
.rk-form-2col{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.rk-image-picker{ display:flex; align-items:center; gap:12px; }
.rk-image-preview{
  width:64px; height:64px; border-radius:12px; background:var(--coral-pale); overflow:hidden; flex-shrink:0;
  display:flex; align-items:center; justify-content:center; font-size:26px;
}
.rk-image-preview img{ width:100%; height:100%; object-fit:cover; }
.rk-upload-btn{
  border:1.5px dashed var(--coral); color:var(--coral-dark); background:var(--coral-pale);
  border-radius:11px; padding:9px 14px; font-size:12px; font-weight:800; cursor:pointer;
  display:flex; align-items:center; gap:6px;
}
.rk-toggle-row{ display:flex; align-items:center; justify-content:space-between; padding:8px 0; }
.rk-toggle-row span{ font-size:13px; font-weight:700; }
.rk-switch{
  width:38px; height:22px; border-radius:20px; background:var(--line); position:relative; cursor:pointer;
  flex-shrink:0;
}
.rk-switch.on{ background:var(--coral); }
.rk-switch-dot{
  width:16px; height:16px; border-radius:50%; background:#fff; position:absolute; top:3px; left:3px;
  transition:left .15s ease;
}
.rk-switch.on .rk-switch-dot{ left:19px; }
.rk-form-actions{ display:flex; gap:10px; margin-top:20px; }
.rk-form-actions button{
  flex:1; border:none; border-radius:16px; padding:12px 0; font-weight:800; font-size:13.5px; cursor:pointer;
}
.rk-form-cancel{ background:#F6EFEC; color:var(--ink); }
.rk-form-save{ background:var(--coral); color:#fff; }

.rk-toast{
  position:absolute; bottom:90px; left:50%; transform:translateX(-50%);
  background:var(--ink); color:#fff; padding:10px 18px; border-radius:12px; font-size:12.5px;
  font-weight:700; z-index:40; white-space:nowrap;
}

@media (max-width:420px){
  .rk-shell{ padding:0; }
  .rk-phone{ border-radius:0; min-height:100vh; }
}
`;


const storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? null : { value };
    } catch {
      return null;
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
};

const CATEGORIES = [
  { id: "breakfast", label: "Breakfast", icon: Coffee },
  { id: "lunch", label: "Lunch", icon: Utensils },
  { id: "dinner", label: "Dinner", icon: Moon },
  { id: "dessert", label: "Dessert", icon: IceCream2 },
];

const PREFS = [
  "Less Salt", "Less Oil", "No Spicy", "Mild Spicy",
  "Extra Spicy", "Less Sugar", "No Garlic", "No Onion",
  "Extra Vegetables", "Extra Protein", "No Cilantro", "Extra Cilantro",
];

const SEED_PRODUCTS = [
  { id: "p1", name: "Crispy Pork Cutlet", local: "香脆猪排", desc: "Golden crispy pork cutlet served with steamed rice and fresh vegetables.", category: "lunch", rating: 4.6, image: "", emoji: "🍖", special: true, top: true, heartPrice: 3 },
  { id: "p2", name: "Beijing Roast Duck", local: "北京烤鸭", desc: "Traditional Beijing-style roasted duck with pancakes, cucumber, scallions, and sweet bean sauce.", category: "dinner", rating: 4.9, image: "", emoji: "🦆", special: false, top: true, heartPrice: 5 },
  { id: "p3", name: "Spicy Mala Chicken Bites", local: "麻辣鸡块", desc: "Tender chicken bites coated in authentic Sichuan mala seasoning with a spicy and numbing flavor.", category: "lunch", rating: 4.8, image: "", emoji: "🍗", special: false, top: false, heartPrice: 3 },
  { id: "p4", name: "Grilled Ribeye Steak", local: "香煎牛排", desc: "Juicy ribeye steak grilled to perfection and served with roasted vegetables.", category: "dinner", rating: 4.7, image: "", emoji: "🥩", special: false, top: false, heartPrice: 6 },
  { id: "p5", name: "Sweet & Sour Fish Rice", local: "糖醋鱼饭", desc: "Tangy sweet and sour fish over steamed rice.", category: "lunch", rating: 4.5, image: "", emoji: "🐟", special: false, top: true, heartPrice: 2 },
  { id: "p6", name: "Braised Pork Trotter Rice", local: "猪脚饭", desc: "Slow-braised pork trotter served over fragrant rice.", category: "lunch", rating: 4.6, image: "", emoji: "🍚", special: false, top: true, heartPrice: 3 },
  { id: "p7", name: "Street-style Taco", local: "墨西哥塔可", desc: "Soft tortilla filled with grilled meat, herbs, and fresh salsa.", category: "dinner", rating: 4.7, image: "", emoji: "🌮", special: false, top: true, heartPrice: 2 },
  { id: "p8", name: "Golden Egg Waffle", local: "鸡蛋仔", desc: "Warm, fluffy egg waffle with a golden crisp shell.", category: "breakfast", rating: 4.8, image: "", emoji: "🧇", special: false, top: false, heartPrice: 2 },
  { id: "p9", name: "Mango Sticky Rice", local: "芒果糯米饭", desc: "Sweet sticky rice with fresh mango and coconut cream.", category: "dessert", rating: 4.9, image: "", emoji: "🥭", special: false, top: false, heartPrice: 2 },
];

const MEAT_OPTIONS = ["Chicken", "Beef", "Pork", "Seafood", "Tofu / Plant-based"];
const SPICE_LEVELS = ["Mild", "Medium", "Spicy", "Extra Spicy"];

const STATUS_STEPS = ["Submitted", "Preparing", "Ready", "Completed"];

const CREDENTIALS = { cook: "7515896523.12Fdr", family: "1314520" };

const emptyDraft = {
  name: "", local: "", desc: "", category: "lunch", rating: 4.5,
  image: "", emoji: "🍽️", special: false, top: false, heartPrice: 1,
};

function BowlLogo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M10 28 Q30 44 50 28" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M14 28 A16 12 0 0 0 46 28" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <line x1="30" y1="10" x2="27" y2="26" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="10" x2="32" y2="26" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DishImage({ product, size = "thumb" }) {
  if (product.image) {
    return <img src={product.image} alt={product.name} />;
  }
  return <span>{product.emoji || "🍽️"}</span>;
}

export default function RiriKitchen() {
  const [stage, setStage] = useState("splash"); // splash -> intro -> login -> app
  const [role, setRole] = useState(null); // 'cook' | 'family'
  const [tab, setTab] = useState("home");
  const [adminOpen, setAdminOpen] = useState(false);
  const [products, setProducts] = useState(SEED_PRODUCTS);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cart, setCart] = useState({}); // id -> { qty, prefs: {name:bool} }
  const [expandedPrefId, setExpandedPrefId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [menuCategory, setMenuCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [toast, setToast] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const pendingDeleteTimer = useRef(null);
  const toastTimer = useRef(null);
  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);
  const [avatar, setAvatar] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notifDraft, setNotifDraft] = useState({ title: "", message: "" });
  const [mealPrefs, setMealPrefs] = useState({ meats: {}, spice: "medium" });
  const [profileSection, setProfileSection] = useState(null); // null | 'favorites' | 'notifications' | 'preferences'
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [loginError, setLoginError] = useState("");
  const [banner, setBanner] = useState("");
  const bannerInputRef = useRef(null);
  const [cookHearts, setCookHearts] = useState(0);
  const [paymentOpen, setPaymentOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStage((s) => (s === "splash" ? "intro" : s)), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [pRes, oRes, aRes, fRes, nRes, mRes, bRes, hRes] = await Promise.all([
          storage.get("rk-products", false).catch(() => null),
          storage.get("rk-orders", false).catch(() => null),
          storage.get("rk-avatar", false).catch(() => null),
          storage.get("rk-favorites", false).catch(() => null),
          storage.get("rk-notifications", false).catch(() => null),
          storage.get("rk-mealprefs", false).catch(() => null),
          storage.get("rk-banner", false).catch(() => null),
          storage.get("rk-cookhearts", false).catch(() => null),
        ]);
        if (pRes && pRes.value) setProducts(JSON.parse(pRes.value));
        if (oRes && oRes.value) setOrders(JSON.parse(oRes.value));
        if (aRes && aRes.value) setAvatar(aRes.value);
        if (fRes && fRes.value) setFavorites(JSON.parse(fRes.value));
        if (nRes && nRes.value) setNotifications(JSON.parse(nRes.value));
        if (mRes && mRes.value) setMealPrefs(JSON.parse(mRes.value));
        if (bRes && bRes.value) setBanner(bRes.value);
        if (hRes && hRes.value) setCookHearts(parseInt(hRes.value, 10) || 0);
      } finally {
        setDataLoaded(true);
      }
    })();
  }, []);

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1800);
  }

  async function persistProducts(next) {
    setProducts(next);
    try {
      await storage.set("rk-products", JSON.stringify(next), false);
    } catch (e) {}
  }

  async function persistOrders(next) {
    setOrders(next);
    try {
      await storage.set("rk-orders", JSON.stringify(next), false);
    } catch (e) {}
  }

  function handleAvatarUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      setAvatar(reader.result);
      try {
        await storage.set("rk-avatar", reader.result, false);
      } catch (err) {}
    };
    reader.readAsDataURL(file);
  }

  async function toggleFavorite(id) {
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(next);
    try {
      await storage.set("rk-favorites", JSON.stringify(next), false);
    } catch (e) {}
  }

  async function publishNotification() {
    if (!notifDraft.title.trim()) {
      showToast("Add a title first");
      return;
    }
    const next = [
      { id: `n${Date.now()}`, title: notifDraft.title, message: notifDraft.message, publishedAt: new Date().toISOString() },
      ...notifications,
    ];
    setNotifications(next);
    try {
      await storage.set("rk-notifications", JSON.stringify(next), false);
    } catch (e) {}
    setNotifDraft({ title: "", message: "" });
    showToast("Notification published");
  }

  async function deleteNotification(id) {
    const next = notifications.filter((n) => n.id !== id);
    setNotifications(next);
    try {
      await storage.set("rk-notifications", JSON.stringify(next), false);
    } catch (e) {}
  }

  async function updateMealPrefs(next) {
    setMealPrefs(next);
    try {
      await storage.set("rk-mealprefs", JSON.stringify(next), false);
    } catch (e) {}
  }
  function toggleMeat(name) {
    updateMealPrefs({ ...mealPrefs, meats: { ...mealPrefs.meats, [name]: !mealPrefs.meats[name] } });
  }
  function setSpiceLevel(level) {
    updateMealPrefs({ ...mealPrefs, spice: level });
  }

  function login(chosenRole) {
    setRole(chosenRole);
    setStage("app");
    setTab("home");
    if (chosenRole === "cook") showToast("Signed in as Cook");
  }

  function attemptLogin() {
    const id = loginId.trim().toLowerCase();
    if (CREDENTIALS[id] && CREDENTIALS[id] === loginPw) {
      setLoginError("");
      setLoginPw("");
      login(id);
    } else {
      setLoginError("Incorrect ID or password");
    }
  }

  function logout() {
    setRole(null);
    setStage("login");
    setAdminOpen(false);
    setTab("home");
    setLoginId("");
    setLoginPw("");
    setLoginError("");
  }

  function handleBannerUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      setBanner(reader.result);
      try {
        await storage.set("rk-banner", reader.result, false);
      } catch (err) {}
    };
    reader.readAsDataURL(file);
  }

  function addToCart(id) {
    setCart((c) => {
      const existing = c[id];
      return { ...c, [id]: existing ? { ...existing, qty: existing.qty + 1 } : { qty: 1, prefs: {} } };
    });
    showToast("Added to order");
  }
  function changeQty(id, delta) {
    setCart((c) => {
      const existing = c[id];
      if (!existing) return c;
      const nextQty = existing.qty + delta;
      const next = { ...c };
      if (nextQty <= 0) delete next[id];
      else next[id] = { ...existing, qty: nextQty };
      return next;
    });
  }
  function toggleItemPref(id, name) {
    setCart((c) => {
      const existing = c[id];
      if (!existing) return c;
      return { ...c, [id]: { ...existing, prefs: { ...existing.prefs, [name]: !existing.prefs[name] } } };
    });
  }

  function openPayment() {
    if (Object.keys(cart).length === 0) return;
    setPaymentOpen(true);
  }

  async function confirmPayment() {
    const items = Object.entries(cart).map(([id, data]) => {
      const p = products.find((x) => x.id === id);
      return {
        id, name: p?.name, local: p?.local, image: p?.image, emoji: p?.emoji,
        heartPrice: p?.heartPrice || 1, qty: data.qty,
        prefs: Object.keys(data.prefs || {}).filter((k) => data.prefs[k]),
      };
    });
    if (items.length === 0) return;
    const totalHearts = items.reduce((sum, it) => sum + it.heartPrice * it.qty, 0);
    const order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      items,
      submittedAt: new Date().toISOString(),
      status: "Submitted",
      heartsPaid: totalHearts,
    };
    await persistOrders([order, ...orders]);
    const nextHearts = cookHearts + totalHearts;
    setCookHearts(nextHearts);
    try {
      await storage.set("rk-cookhearts", String(nextHearts), false);
    } catch (e) {}
    setCart({});
    setExpandedPrefId(null);
    setPaymentOpen(false);
    showToast(`Paid ❤️ ${totalHearts} — order submitted`);
  }

  function advanceStatus(orderId) {
    const next = orders.map((o) => {
      if (o.id !== orderId) return o;
      const idx = STATUS_STEPS.indexOf(o.status);
      const nextStatus = STATUS_STEPS[Math.min(idx + 1, STATUS_STEPS.length - 1)];
      return { ...o, status: nextStatus };
    });
    persistOrders(next);
    showToast("Order status updated");
  }

  async function cancelOrder(orderId) {
    const order = orders.find((o) => o.id === orderId);
    const next = orders.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o));
    await persistOrders(next);
    if (order?.heartsPaid) {
      const nextHearts = Math.max(0, cookHearts - order.heartsPaid);
      setCookHearts(nextHearts);
      try {
        await storage.set("rk-cookhearts", String(nextHearts), false);
      } catch (e) {}
    }
    showToast("Order cancelled");
  }

  function confirmOrDelete(key, onConfirm) {
    if (pendingDelete === key) {
      clearTimeout(pendingDeleteTimer.current);
      setPendingDelete(null);
      onConfirm();
    } else {
      setPendingDelete(key);
      clearTimeout(pendingDeleteTimer.current);
      pendingDeleteTimer.current = setTimeout(() => setPendingDelete(null), 3000);
    }
  }

  function openAddForm() {
    setDraft({ ...emptyDraft, id: null });
  }
  function openEditForm(p) {
    setDraft({ ...p });
  }
  function closeForm() {
    setDraft(null);
  }
  function saveDraft() {
    if (!draft.name.trim()) {
      showToast("Name is required");
      return;
    }
    if (draft.id) {
      persistProducts(products.map((p) => (p.id === draft.id ? draft : p)));
      showToast("Product updated");
    } else {
      const newProduct = { ...draft, id: `p${Date.now()}` };
      persistProducts([newProduct, ...products]);
      showToast("Product published");
    }
    setDraft(null);
  }
  function deleteProduct(id) {
    persistProducts(products.filter((p) => p.id !== id));
    showToast("Product removed");
  }
  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, image: reader.result }));
    reader.readAsDataURL(file);
  }

  const specialProduct = products.find((p) => p.special) || products[0];
  const topProducts = products.filter((p) => p.top);
  const filteredMenu = products.filter((p) => {
    const matchCat = menuCategory === "all" || p.category === menuCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.local.includes(search);
    return matchCat && matchSearch;
  });
  const cartCount = Object.values(cart).reduce((a, b) => a + b.qty, 0);
  const cartItems = Object.entries(cart).map(([id, data]) => ({ ...products.find((p) => p.id === id), qty: data.qty, itemPrefs: data.prefs }));
  const paymentTotal = cartItems.reduce((sum, it) => sum + (it.heartPrice || 1) * it.qty, 0);
  const activeOrder = orders.find((o) => o.status !== "Completed" && o.status !== "Cancelled");

  return (
    <div className="rk-shell">
      <style>{STYLE}</style>
      <div className="rk-phone">
        {stage === "splash" && (
          <div className="rk-splash">
            <div className="rk-bowl"><BowlLogo /></div>
            <div className="rk-logo-word">Riri kitchen</div>
          </div>
        )}

        {stage === "intro" && (
          <div className="rk-intro" onClick={() => setStage("login")}>
            <div className="rk-intro-art">🍲</div>
            <h2>All your favorite foods</h2>
            <p>Welcome to Riri Kitchen</p>
            <div className="rk-tap-hint">TAP TO CONTINUE</div>
          </div>
        )}

        {stage === "login" && (
          <div className="rk-login-wrap">
            <div className="rk-login-card">
              <h1>Log In</h1>
              {loginError && <div className="rk-login-error">{loginError}</div>}
              <div className="rk-field">
                <label>ID</label>
                <input
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="cook or family"
                  autoCapitalize="none"
                />
              </div>
              <div className="rk-field">
                <label>Password</label>
                <input
                  type="password"
                  value={loginPw}
                  onChange={(e) => setLoginPw(e.target.value)}
                  placeholder="••••••••"
                  onKeyDown={(e) => { if (e.key === "Enter") attemptLogin(); }}
                />
              </div>
              <button className="rk-cta" style={{ marginTop: 8 }} onClick={attemptLogin}>Log In</button>
            </div>
            <div className="rk-login-footer">
              <div className="rk-logo-word" style={{ color: "var(--coral)", fontSize: 20 }}>Riri kitchen</div>
            </div>
          </div>
        )}

        {stage === "app" && !adminOpen && (
          <>
            <div className="rk-screen">
              <div className="rk-content">
                {tab === "home" && (
                  <>
                    <div className="rk-topbar">
                      <h2>Home</h2>
                      <div className="rk-bell" onClick={() => { setTab("profile"); setProfileSection("notifications"); }}><Bell size={16} /></div>
                    </div>
                    <div className="rk-search">
                      <Search size={15} color="#9C8C85" />
                      <input placeholder="Search dishes..." value={search} onChange={(e) => { setSearch(e.target.value); }} onKeyDown={(e) => { if (e.key === "Enter") { setTab("menu"); } }} />
                    </div>
                    <div
                      className="rk-promo"
                      style={banner ? { backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
                    >
                      {!banner && <div className="rk-promo-emoji">🎉</div>}
                      <div style={banner ? { background: "rgba(43,33,29,0.4)", borderRadius: 12, padding: "8px 12px" } : {}}>
                        <strong>Get your 50% OFF</strong>
                        <span>coupon on your first order</span>
                      </div>
                      {role === "cook" && (
                        <>
                          <button className="rk-banner-edit" onClick={() => bannerInputRef.current?.click()} title="Change banner photo">
                            <Upload size={12} />
                          </button>
                          <input ref={bannerInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleBannerUpload} />
                        </>
                      )}
                    </div>
                    {specialProduct && (
                      <div className="rk-special" onClick={() => setTab("menu")}>
                        <div className="rk-special-emoji"><DishImage product={specialProduct} /></div>
                        <div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--coral-dark)" }}>TODAY'S SPECIAL</span>
                          <strong>{specialProduct.name}</strong>
                        </div>
                      </div>
                    )}
                    <div className="rk-section-label">Top Order</div>
                    <div className="rk-top-row">
                      {topProducts.map((p) => (
                        <div className="rk-top-item" key={p.id} onClick={() => { setMenuCategory("all"); setTab("menu"); }}>
                          <div className="rk-top-thumb"><DishImage product={p} /></div>
                          <span>{p.local}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {tab === "menu" && (
                  <>
                    <div className="rk-topbar">
                      <h2>Menu</h2>
                      <div className="rk-bell" onClick={() => { setTab("profile"); setProfileSection("notifications"); }}><Bell size={16} /></div>
                    </div>
                    <div className="rk-search">
                      <Search size={15} color="#9C8C85" />
                      <input placeholder="Search dishes..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="rk-cats">
                      <button className={`rk-cat-btn ${menuCategory === "all" ? "active" : ""}`} onClick={() => setMenuCategory("all")}>
                        <ShoppingBag size={17} /><span>ALL</span>
                      </button>
                      {CATEGORIES.map((c) => (
                        <button key={c.id} className={`rk-cat-btn ${menuCategory === c.id ? "active" : ""}`} onClick={() => setMenuCategory(c.id)}>
                          <c.icon size={17} /><span>{c.label.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                    {filteredMenu.length === 0 ? (
                      <div className="rk-empty"><div className="rk-empty-emoji">🔍</div><p>No dishes match that search.</p></div>
                    ) : (
                      filteredMenu.map((p) => (
                        <div className="rk-dish-card" key={p.id}>
                          <div className="rk-dish-thumb"><DishImage product={p} /></div>
                          <div className="rk-dish-info">
                            <h4>{p.name} <span className="rk-dish-local">({p.local})</span></h4>
                            <div className="rk-dish-desc">{p.desc}</div>
                            <div className="rk-dish-foot">
                              <div className="rk-rating"><Star size={12} fill="currentColor" /> {p.rating} / 5 <span style={{ marginLeft: 6 }}>❤️ {p.heartPrice || 1}</span></div>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button
                                  className="rk-add-btn"
                                  style={{ background: favorites.includes(p.id) ? "var(--coral)" : "#F6EFEC", color: favorites.includes(p.id) ? "#fff" : "var(--muted)" }}
                                  onClick={() => toggleFavorite(p.id)}
                                >
                                  <Heart size={13} fill={favorites.includes(p.id) ? "currentColor" : "none"} />
                                </button>
                                <button className="rk-add-btn" onClick={() => addToCart(p.id)}><Plus size={14} /></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}

                {tab === "order" && role === "cook" && (
                  <>
                    <div className="rk-topbar">
                      <h2>Kitchen Orders</h2>
                      <div className="rk-bell" onClick={() => { setTab("profile"); setProfileSection("notifications"); }}><Bell size={16} /></div>
                    </div>
                    {orders.length === 0 ? (
                      <div className="rk-empty">
                        <div className="rk-empty-emoji">🧑‍🍳</div>
                        <p>No orders in the queue yet.</p>
                      </div>
                    ) : (
                      orders.map((o) => {
                        const isDone = o.status === "Completed";
                        const isCancelled = o.status === "Cancelled";
                        const nextLabel = { Submitted: "Start preparing", Preparing: "Mark ready", Ready: "Mark completed" }[o.status];
                        return (
                          <div className="rk-order-card" key={o.id} style={{ flexDirection: "column", gap: 10, opacity: isCancelled ? 0.6 : 1 }}>
                            <div style={{ display: "flex", gap: 14, width: "100%" }}>
                              <div className="rk-order-thumb"><DishImage product={o.items[0] || {}} /></div>
                              <div className="rk-order-meta" style={{ flex: 1 }}>
                                <strong>Order #{o.id.split("-")[1]}</strong>
                                <div>{o.items.map((it) => `${it.name} ×${it.qty}${it.prefs?.length ? ` (${it.prefs.join(", ")})` : ""}`).join(", ")}</div>
                                <div>Submitted: {new Date(o.submittedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                                  <span className={`rk-status-pill ${isCancelled ? "cancelled" : ""}`}>{o.status}</span>
                                  <span className="rk-status-pill">❤️ {o.heartsPaid || 0}</span>
                                </div>
                              </div>
                            </div>
                            {!isDone && !isCancelled && (
                              <button className="rk-checkout-btn" style={{ marginTop: 0 }} onClick={() => advanceStatus(o.id)}>
                                {nextLabel}
                              </button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </>
                )}

                {tab === "order" && role !== "cook" && (
                  <>
                    <div className="rk-topbar">
                      <h2>Order</h2>
                      <div className="rk-bell" onClick={() => { setTab("profile"); setProfileSection("notifications"); }}><Bell size={16} /></div>
                    </div>
                    {cartCount > 0 ? (
                      <>
                        <div className="rk-section-label">My Order</div>
                        {cartItems.map((item) => {
                          const selectedCount = Object.values(item.itemPrefs || {}).filter(Boolean).length;
                          return (
                            <div key={item.id} className="rk-cart-row" style={{ flexDirection: "column", alignItems: "stretch" }}>
                              <div style={{ display: "flex", gap: 12 }}>
                                <div className="rk-dish-thumb"><DishImage product={item} /></div>
                                <div className="rk-dish-info">
                                  <h4>{item.name} <span className="rk-dish-local">({item.local})</span></h4>
                                  <div className="rk-dish-desc">{item.desc}</div>
                                  <div className="rk-qty-controls">
                                    <button className="rk-qty-btn" onClick={() => changeQty(item.id, -1)}>
                                      {item.qty === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                                    </button>
                                    <span className="rk-qty-num">{item.qty}</span>
                                    <button className="rk-qty-btn" onClick={() => changeQty(item.id, 1)}><Plus size={12} /></button>
                                    <button
                                      className="rk-pref-toggle-link"
                                      onClick={() => setExpandedPrefId(expandedPrefId === item.id ? null : item.id)}
                                    >
                                      {selectedCount > 0 ? `Preferences (${selectedCount})` : "Add preferences"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {expandedPrefId === item.id && (
                                <div className="rk-pref-grid" style={{ margin: "12px 0 2px" }}>
                                  {PREFS.map((name) => (
                                    <div
                                      key={name}
                                      className={`rk-pref-chip ${item.itemPrefs?.[name] ? "checked" : ""}`}
                                      onClick={() => toggleItemPref(item.id, name)}
                                    >
                                      <span className="rk-checkbox">{item.itemPrefs?.[name] && <Check size={10} />}</span>
                                      {name}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        <button className="rk-checkout-btn" onClick={openPayment}>Go to checkout</button>
                      </>
                    ) : orders.length > 0 ? (
                      <>
                        {activeOrder ? (
                          <>
                            <div className="rk-section-label">Current Order</div>
                            <div className="rk-order-card">
                              <div className="rk-order-thumb"><DishImage product={activeOrder.items[0] || {}} /></div>
                              <div className="rk-order-meta">
                                <strong>Order #{activeOrder.id.split("-")[1]}</strong>
                                <div>Submitted: {new Date(activeOrder.submittedAt).toLocaleDateString()}</div>
                                <div>{activeOrder.items.map((it) => `${it.name} ×${it.qty}${it.prefs?.length ? ` (${it.prefs.join(", ")})` : ""}`).join(" · ")}</div>
                                <div className="rk-status-pill">{activeOrder.status}</div>
                              </div>
                            </div>
                            <div className="rk-stepper">
                              {STATUS_STEPS.map((s, i) => (
                                <div key={s} className={`rk-step ${i <= STATUS_STEPS.indexOf(activeOrder.status) ? "done" : ""}`}>
                                  {i > 0 && <div className="rk-step-line" />}
                                  <div className="rk-step-dot" />
                                  <span>{s}</span>
                                </div>
                              ))}
                            </div>
                            {activeOrder.status === "Submitted" && (
                              <button
                                className="rk-form-cancel"
                                style={{ width: "100%", borderRadius: 16, padding: "12px 0", marginBottom: 20, fontWeight: 800, fontSize: 13.5, border: "none", cursor: "pointer" }}
                                onClick={() => cancelOrder(activeOrder.id)}
                              >
                                Cancel order
                              </button>
                            )}
                          </>
                        ) : (
                          <div className="rk-empty" style={{ padding: "30px 20px" }}>
                            <p>No active order right now.</p>
                            <button onClick={() => setTab("menu")}>Order again</button>
                          </div>
                        )}
                        {orders.length > (activeOrder ? 1 : 0) && (
                          <>
                            <div className="rk-section-label">Order History</div>
                            <div className="rk-history-grid">
                              {orders.filter((o) => o.id !== activeOrder?.id).slice(0, 9).map((o) => (
                                <div className="rk-history-thumb" key={o.id} style={{ position: "relative" }}>
                                  <DishImage product={o.items[0] || {}} />
                                  {o.status === "Cancelled" && <span className="rk-cancelled-badge">Cancelled</span>}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        <div className="rk-feedback-bar">
                          <span>Give your chef some love (or honest feedback)!</span>
                          <div className="rk-emoji-row">
                            {["😍", "🙂", "😐", "😞"].map((e) => (
                              <button key={e} className={feedback === e ? "picked" : ""} onClick={() => { setFeedback(e); showToast("Thanks for the feedback"); }}>{e}</button>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="rk-empty">
                        <div className="rk-empty-emoji">🍽️</div>
                        <p>No orders yet — browse the menu to get started.</p>
                        <button onClick={() => setTab("menu")}>Browse Menu</button>
                      </div>
                    )}
                  </>
                )}

                {tab === "profile" && profileSection === null && (
                  <>
                    <div className="rk-topbar">
                      <h2>Profile</h2>
                      <div className="rk-bell" onClick={() => { setTab("profile"); setProfileSection("notifications"); }}><Bell size={16} /></div>
                    </div>
                    <div className="rk-avatar-block">
                      <div className="rk-avatar-edit" onClick={() => avatarInputRef.current?.click()}>
                        <div className="rk-avatar">
                          {avatar ? <img src={avatar} alt="avatar" /> : <User size={32} />}
                        </div>
                        <div className="rk-avatar-cam"><Upload size={12} /></div>
                      </div>
                      <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarUpload} />
                      <strong>User Name</strong>
                      <div className="rk-role-tag">{role === "cook" ? "Cook" : "Family Member"}</div>
                      <div className="rk-email">riri@email.com</div>
                      {role === "cook" && (
                        <div className="rk-hearts-stat" style={{ cursor: "pointer" }} onClick={() => setProfileSection("hearts")}>❤️ {cookHearts} hearts earned</div>
                      )}
                    </div>
                    <div className="rk-nav-list">
                      {[
                        { icon: Heart, label: "Meal Preferences", section: "preferences" },
                        { icon: Star, label: "Favorite Dishes", section: "favorites" },
                        { icon: Bell, label: "Notifications", section: "notifications" },
                        { icon: Settings, label: "Settings", section: null },
                        { icon: HelpCircle, label: "Help & Support", section: null },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="rk-nav-row"
                          onClick={() => (row.section ? setProfileSection(row.section) : showToast(`${row.label} — coming soon`))}
                        >
                          <span className="rk-icon-wrap"><row.icon size={15} /></span>
                          {row.label}
                          {row.label === "Notifications" && notifications.length > 0 && (
                            <span className="rk-tag special" style={{ marginLeft: "auto" }}>{notifications.length}</span>
                          )}
                          {row.label === "Favorite Dishes" && favorites.length > 0 && (
                            <span className="rk-tag special" style={{ marginLeft: "auto" }}>{favorites.length}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <button className="rk-manage-btn" onClick={() => setAdminOpen(true)}>
                      <Edit2 size={14} /> Manage Menu (Admin)
                    </button>
                    <button className="rk-logout-btn" onClick={logout}>Log Out</button>
                  </>
                )}

                {tab === "profile" && profileSection === "preferences" && (
                  <>
                    <div className="rk-topbar">
                      <button className="rk-back-btn" onClick={() => setProfileSection(null)}><ChevronLeft size={18} /></button>
                      <h2>Meal Preferences</h2>
                      <div style={{ width: 34 }} />
                    </div>
                    <div className="rk-section-label">Meat you enjoy</div>
                    <div className="rk-pref-grid">
                      {MEAT_OPTIONS.map((name) => (
                        <div key={name} className={`rk-pref-chip ${mealPrefs.meats[name] ? "checked" : ""}`} onClick={() => toggleMeat(name)}>
                          <span className="rk-checkbox">{mealPrefs.meats[name] && <Check size={10} />}</span>
                          {name}
                        </div>
                      ))}
                    </div>
                    <div className="rk-section-label">Spice level</div>
                    <div className="rk-pref-grid">
                      {SPICE_LEVELS.map((level) => (
                        <div key={level} className={`rk-pref-chip ${mealPrefs.spice === level ? "checked" : ""}`} onClick={() => setSpiceLevel(level)}>
                          <span className="rk-checkbox">{mealPrefs.spice === level && <Check size={10} />}</span>
                          {level}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {tab === "profile" && profileSection === "favorites" && (
                  <>
                    <div className="rk-topbar">
                      <button className="rk-back-btn" onClick={() => setProfileSection(null)}><ChevronLeft size={18} /></button>
                      <h2>Favorite Dishes</h2>
                      <div style={{ width: 34 }} />
                    </div>
                    {products.length === 0 ? (
                      <div className="rk-empty"><div className="rk-empty-emoji">🤍</div><p>No dishes on the menu yet.</p></div>
                    ) : (
                      products.map((p) => (
                        <div className="rk-dish-card" key={p.id}>
                          <div className="rk-dish-thumb"><DishImage product={p} /></div>
                          <div className="rk-dish-info">
                            <h4>{p.name} <span className="rk-dish-local">({p.local})</span></h4>
                            <div className="rk-dish-foot">
                              <div className="rk-rating"><Star size={12} fill="currentColor" /> {p.rating} / 5</div>
                              <button
                                className="rk-add-btn"
                                style={{ background: favorites.includes(p.id) ? "var(--coral)" : "#F6EFEC", color: favorites.includes(p.id) ? "#fff" : "var(--muted)" }}
                                onClick={() => toggleFavorite(p.id)}
                              >
                                <Heart size={13} fill={favorites.includes(p.id) ? "currentColor" : "none"} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}

                {tab === "profile" && profileSection === "notifications" && (
                  <>
                    <div className="rk-topbar">
                      <button className="rk-back-btn" onClick={() => setProfileSection(null)}><ChevronLeft size={18} /></button>
                      <h2>Notifications</h2>
                      <div style={{ width: 34 }} />
                    </div>
                    {role === "cook" && (
                      <div style={{ background: "#F6EFEC", borderRadius: 16, padding: 16, marginBottom: 20 }}>
                        <label style={{ fontSize: 11.5, fontWeight: 700, color: "var(--muted)", display: "block", marginBottom: 8 }}>Publish an announcement</label>
                        <div className="rk-form-row">
                          <input placeholder="Title" value={notifDraft.title} onChange={(e) => setNotifDraft({ ...notifDraft, title: e.target.value })} />
                        </div>
                        <div className="rk-form-row" style={{ marginBottom: 10 }}>
                          <textarea placeholder="Message" value={notifDraft.message} onChange={(e) => setNotifDraft({ ...notifDraft, message: e.target.value })} />
                        </div>
                        <button className="rk-checkout-btn" style={{ margin: 0 }} onClick={publishNotification}>Publish</button>
                      </div>
                    )}
                    {notifications.length === 0 ? (
                      <div className="rk-empty"><div className="rk-empty-emoji">🔔</div><p>No announcements yet.</p></div>
                    ) : (
                      notifications.map((n) => (
                        <div className="rk-order-card" key={n.id} style={{ flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <strong style={{ fontSize: 13.5 }}>{n.title}</strong>
                            {role === "cook" && (
                              <button
                                className={`rk-admin-icon-btn ${pendingDelete === `notif:${n.id}` ? "confirm" : ""}`}
                                onClick={() => confirmOrDelete(`notif:${n.id}`, () => deleteNotification(n.id))}
                              >
                                {pendingDelete === `notif:${n.id}` ? <Check size={12} /> : <Trash2 size={12} />}
                              </button>
                            )}
                          </div>
                          {n.message && <div style={{ fontSize: 12, color: "var(--muted)" }}>{n.message}</div>}
                          <div style={{ fontSize: 10.5, color: "var(--muted)" }}>{new Date(n.publishedAt).toLocaleString()}</div>
                        </div>
                      ))
                    )}
                  </>
                )}

                {tab === "profile" && profileSection === "hearts" && (
                  <>
                    <div className="rk-topbar">
                      <button className="rk-back-btn" onClick={() => setProfileSection(null)}><ChevronLeft size={18} /></button>
                      <h2>Hearts Earned</h2>
                      <div style={{ width: 34 }} />
                    </div>
                    <div className="rk-hearts-stat" style={{ display: "block", textAlign: "center", fontSize: 15, padding: "12px 0", marginBottom: 20 }}>
                      ❤️ {cookHearts} total hearts
                    </div>
                    {orders.filter((o) => o.heartsPaid).length === 0 ? (
                      <div className="rk-empty"><div className="rk-empty-emoji">❤️</div><p>No paid orders yet.</p></div>
                    ) : (
                      orders.filter((o) => o.heartsPaid).map((o) => (
                        <div className="rk-order-card" key={o.id} style={{ flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <strong style={{ fontSize: 13 }}>Order #{o.id.split("-")[1]}</strong>
                            <span style={{ fontWeight: 800, color: "var(--coral-dark)" }}>❤️ {o.heartsPaid}</span>
                          </div>
                          <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{o.items.map((it) => `${it.name} ×${it.qty}`).join(", ")}</div>
                          <div style={{ fontSize: 10.5, color: "var(--muted)" }}>{new Date(o.submittedAt).toLocaleString()}{o.status === "Cancelled" ? " · Cancelled" : ""}</div>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="rk-bottomnav">
              <button className={`rk-nav-btn ${tab === "home" ? "active" : ""}`} onClick={() => setTab("home")}><HomeIcon size={18} /><span>Home</span></button>
              <button className={`rk-nav-btn ${tab === "menu" ? "active" : ""}`} onClick={() => setTab("menu")}><Utensils size={18} /><span>Menu</span></button>
              <div className="rk-nav-btn-wrap">
                {role === "cook"
                  ? orders.filter((o) => o.status !== "Completed").length > 0 && (
                      <div className="rk-cart-badge">{orders.filter((o) => o.status !== "Completed").length}</div>
                    )
                  : cartCount > 0 && <div className="rk-cart-badge">{cartCount}</div>}
                <button className={`rk-nav-btn ${tab === "order" ? "active" : ""}`} style={{ width: "100%" }} onClick={() => setTab("order")}><ClipboardList size={18} /><span>Order</span></button>
              </div>
              <button className={`rk-nav-btn ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}><User size={18} /><span>Profile</span></button>
            </div>

            {paymentOpen && (
              <div className="rk-form-overlay">
                <div className="rk-form-sheet">
                  <h3>Payment</h3>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "9px 0", borderBottom: "1px solid var(--line)" }}>
                      <span>{item.name} × {item.qty}</span>
                      <span>❤️ {(item.heartPrice || 1) * item.qty}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, padding: "16px 0 6px" }}>
                    <span>Total</span>
                    <span>❤️ {paymentTotal}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 6 }}>
                    This is a demo payment — hearts go straight to the kitchen, no real money involved.
                  </div>
                  <div className="rk-form-actions">
                    <button className="rk-form-cancel" onClick={() => setPaymentOpen(false)}>Cancel</button>
                    <button className="rk-form-save" onClick={confirmPayment}>Pay ❤️ {paymentTotal}</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {stage === "app" && adminOpen && (
          <div className="rk-screen">
            <div className="rk-admin-header">
              <button className="rk-back-btn" onClick={() => setAdminOpen(false)}><ChevronLeft size={18} /></button>
              <h2>Manage Menu</h2>
              <button className="rk-admin-add" onClick={openAddForm}><Plus size={14} /> Add</button>
            </div>
            <div className="rk-admin-list">
              {!dataLoaded ? (
                <div className="rk-empty">Loading…</div>
              ) : products.length === 0 ? (
                <div className="rk-empty"><div className="rk-empty-emoji">🍽️</div><p>No products yet.</p><button onClick={openAddForm}>Add your first dish</button></div>
              ) : (
                products.map((p) => (
                  <div className="rk-admin-row" key={p.id}>
                    <div className="rk-admin-thumb"><DishImage product={p} /></div>
                    <div className="rk-admin-row-info">
                      <strong>{p.name}</strong>
                      <div className="rk-admin-tags">
                        <span className="rk-tag">{p.category}</span>
                        <span className="rk-tag">❤️ {p.heartPrice || 1}</span>
                        {p.special && <span className="rk-tag special">Special</span>}
                        {p.top && <span className="rk-tag special">Top Order</span>}
                      </div>
                    </div>
                    <div className="rk-admin-actions">
                      <button className="rk-admin-icon-btn" onClick={() => openEditForm(p)}><Edit2 size={13} /></button>
                      <button
                        className={`rk-admin-icon-btn ${pendingDelete === `product:${p.id}` ? "confirm" : ""}`}
                        onClick={() => confirmOrDelete(`product:${p.id}`, () => deleteProduct(p.id))}
                      >
                        {pendingDelete === `product:${p.id}` ? <Check size={13} /> : <Trash2 size={13} />}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {draft && (
              <div className="rk-form-overlay">
                <div className="rk-form-sheet">
                  <h3>{draft.id ? "Edit Dish" : "Add Dish"}</h3>
                  <div className="rk-form-row">
                    <label>Image</label>
                    <div className="rk-image-picker">
                      <div className="rk-image-preview"><DishImage product={draft} /></div>
                      <button className="rk-upload-btn" onClick={() => fileInputRef.current?.click()}>
                        <Upload size={13} /> Upload photo
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
                    </div>
                  </div>
                  <div className="rk-form-row">
                    <label>Name (English)</label>
                    <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Crispy Pork Cutlet" />
                  </div>
                  <div className="rk-form-row">
                    <label>Name (Local)</label>
                    <input value={draft.local} onChange={(e) => setDraft({ ...draft, local: e.target.value })} placeholder="e.g. 香脆猪排" />
                  </div>
                  <div className="rk-form-row">
                    <label>Description</label>
                    <textarea value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} placeholder="Short description shown on the menu" />
                  </div>
                  <div className="rk-form-2col">
                    <div className="rk-form-row">
                      <label>Category</label>
                      <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
                        {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    </div>
                    <div className="rk-form-row">
                      <label>Rating</label>
                      <input type="number" min="0" max="5" step="0.1" value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: parseFloat(e.target.value) || 0 })} />
                    </div>
                  </div>
                  <div className="rk-form-row">
                    <label>Heart Price (❤️ per order)</label>
                    <input type="number" min="1" step="1" value={draft.heartPrice} onChange={(e) => setDraft({ ...draft, heartPrice: parseInt(e.target.value, 10) || 1 })} />
                  </div>
                  <div className="rk-toggle-row">
                    <span>Today's Special</span>
                    <div className={`rk-switch ${draft.special ? "on" : ""}`} onClick={() => setDraft({ ...draft, special: !draft.special })}>
                      <div className="rk-switch-dot" />
                    </div>
                  </div>
                  <div className="rk-toggle-row">
                    <span>Show in Top Order</span>
                    <div className={`rk-switch ${draft.top ? "on" : ""}`} onClick={() => setDraft({ ...draft, top: !draft.top })}>
                      <div className="rk-switch-dot" />
                    </div>
                  </div>
                  <div className="rk-form-actions">
                    <button className="rk-form-cancel" onClick={closeForm}>Cancel</button>
                    <button className="rk-form-save" onClick={saveDraft}>{draft.id ? "Save changes" : "Publish"}</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {toast && <div className="rk-toast">{toast}</div>}
      </div>
    </div>
  );
}
