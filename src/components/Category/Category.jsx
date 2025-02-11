import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesSlider() {
    // إعدادات شريط التمرير
    const settings = {
        dots: false, // إزالة النقاط
        infinite: true, // التمرير اللانهائي
        speed: 500, // سرعة التمرير
        slidesToShow: 4, // عدد العناصر المعروضة
        slidesToScroll: 1, // عدد العناصر التي يتم التمرير بها
        autoplay: true, // التمرير التلقائي
        autoplaySpeed: 1000, // مدة التمرير التلقائي (2 ثانية)
        arrows: true, // إظهار الأسهم الجانبية
    };

    // حالة لتخزين الفئات
    const [categories, setCategories] = useState([]);

    // استدعاء API لجلب الفئات
    async function getCategories() {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            setCategories(data.data); // تخزين البيانات في الحالة
        } catch (error) {
            console.error("Error fetching categories:", error); // تسجيل الأخطاء في وحدة التحكم
        }
    }

    // استدعاء getCategories عند تحميل المكون
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="categories-slider-container">
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index} className="my-10 px-2">
                        <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-full h-[200px] object-cover object-top rounded-lg shadow-md" 
                        />
                        <h3 className="text-center text-lg font-semibold mt-2">{category.name}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
