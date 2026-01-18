import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const PropertyDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // تأكد أن id موجود

    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}`
        );
        setProperty(response.data);
      } catch (err) {
        console.error(err);
        setError('فشل تحميل بيانات العقار');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p>جارٍ التحميل...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>العقار غير موجود</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <div className="mb-6">
        {property.images && property.images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.images.map((img, index) => (
              <Image
                key={index}
                src={img.url}
                alt={`صورة العقار ${index + 1}`}
                width={500}
                height={300}
                className="rounded-lg"
              />
            ))}
          </div>
        ) : (
          <p>لا توجد صور للعقار</p>
        )}
      </div>

      <p className="mb-2"><strong>الوصف:</strong> {property.description}</p>
      <p className="mb-2"><strong>السعر:</strong> {property.price} دولار / الليلة</p>
      <p className="mb-2"><strong>الموقع:</strong> {property.location}</p>
      <p className="mb-2"><strong>عدد الغرف:</strong> {property.rooms}</p>

      <button
        onClick={() => router.push(`/booking?propertyId=${id}`)}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        احجز الآن
      </button>
    </div>
  );
};

export default PropertyDetails;
