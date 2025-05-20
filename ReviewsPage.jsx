
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  useEffect(() => {
    fetch("/arabic_reviews_740.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const filteredReviews = reviews.filter((review) =>
    review.name.includes(search)
  );

  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">
        التقييمات | شامل للحلول والخدمات
      </h1>
      <div className="text-center text-yellow-500 text-xl mb-2">
        ★★★★★ 4.9 من 5 بناءً على 740 تقييم
      </div>

      <div className="text-center text-sm text-gray-500 mb-6">
        للاستفسارات أو إضافة تقييمك يدويًا:
        <a href="https://wa.me/966580690289" className="text-green-600 font-semibold" target="_blank" rel="noopener noreferrer">
          تواصل معنا عبر واتساب: +966580690289
        </a>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="ابحث باسم المستخدم..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-2/3"
        />
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => alert("شكراً! سيتم تحويلك لإضافة تقييمك قريباً")}
        >
          + أضف تقييمك
        </Button>
      </div>

      <div className="grid gap-4">
        {currentReviews.map((review, idx) => (
          <Card key={idx} className="bg-white text-right">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{review.name}</div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
              <div className="flex items-center text-yellow-500 my-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p>{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={\`px-3 py-1 rounded-md border text-sm \${currentPage === idx + 1 ? "bg-black text-white" : "bg-white text-black"}\`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
