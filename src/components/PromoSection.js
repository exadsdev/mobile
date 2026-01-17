'use client';

import { useState, useEffect } from 'react';
import { saveClick } from '@/components/VisitorTracker';
import siteConfig from '@/config/site';

export default function PromoSection() {
    const [shopUrl, setShopUrl] = useState('');
    const [previewImg, setPreviewImg] = useState('');

    useEffect(() => {
        // ดึงค่า shopUrl จาก Settings (localStorage)
        try {
            const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
            if (settings.shopUrl) {
                const cleanUrl = settings.shopUrl.replace(/\/+$/, ''); // ลบ slash สุดท้าย
                setShopUrl(cleanUrl);
                setPreviewImg(`${cleanUrl}/img-proxy.php?f=1.gif&v=00419aed08`);
            }
        } catch (e) {
            console.error('Error reading shopUrl from settings', e);
        }
    }, []);

    const handleLinkClick = (type, extra) => {
        // type: 'line' | 'facebook' | 'shopImage'
        saveClick(`promo-${type}`, extra);
    };

    return (
        <section className="section section-alt">
            <div className="container">
                <div
                    className="feature-card"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '18px',
                        flexWrap: 'wrap',
                    }}
                >
                    <div style={{ flex: 1, minWidth: '260px' }}>
                        <h2 style={{ margin: '0 0 8px' }}>
                            รับคูปองส่วนลด <span style={{ color: '#fbbf24' }}>10%</span> สำหรับการสั่งซื้อครั้งแรก
                        </h2>
                        <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.8 }}>
                            ทักแชทเพื่อรับโค้ดส่วนลด แจ้งรุ่นที่ต้องการ + งบประมาณ ทีมงานช่วยแนะนำให้เหมาะกับการใช้งานได้เลย
                        </p>
                        <div className="cta-buttons" style={{ marginTop: '12px' }}>
                            <a
                                href={siteConfig.social.line}
                                className="btn btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleLinkClick('line')}
                            >
                                รับคูปองทาง LINE
                            </a>
                            <a
                                href={siteConfig.social.facebookPage}
                                className="btn btn-outline"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleLinkClick('facebook')}
                            >
                                ทัก Facebook
                            </a>
                        </div>
                    </div>
                    <div style={{ minWidth: '220px', textAlign: 'center' }}>
                        <div
                            className="badge"
                            style={{ display: 'inline-block', padding: '10px 14px', fontSize: '14px', marginBottom: '10px' }}
                        >
                            โค้ดส่วนลดสำหรับลูกค้าใหม่
                        </div>
                        <div style={{ fontSize: '44px', fontWeight: 800, letterSpacing: '1px', opacity: 0.9 }}>
                            10% OFF
                        </div>
                        <div style={{ opacity: 0.75, marginTop: '6px' }}>* เงื่อนไขตามที่ร้านกำหนด</div>
                        {previewImg && (
                            <div style={{ marginTop: '1rem' }}>
                                <img
                                    src={previewImg}
                                    alt="Shop preview"
                                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                                    onClick={() => handleLinkClick('shopImage')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
