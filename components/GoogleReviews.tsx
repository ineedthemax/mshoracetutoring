import { Star, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GoogleReview {
  rating: number;
  text?: { text: string };
  relativePublishTimeDescription: string;
  authorAttribution: {
    displayName: string;
    photoUri?: string;
  };
}

interface PlaceDetails {
  rating: number;
  userRatingCount: number;
  reviews?: GoogleReview[];
}

// Fallback shown while API key is not set or fetch fails
const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    rating: 5,
    text: { text: "Ms. Horace makes math easier to understand!! Never thought I would get it, but she makes math simple and now I have more confidence in my skills! She's very patient and thorough. Highly recommend Ms. Horace 10/10!!" },
    relativePublishTimeDescription: "in the last week",
    authorAttribution: { displayName: "Mari Judge" },
  },
  {
    rating: 5,
    text: { text: "Ms. Horace as my math tutor has been an incredible experience for me. My confidence in math has significantly improved, and I've seen amazing results while in class with her help. I highly recommend her to anyone looking for a knowledgeable and supportive tutor!" },
    relativePublishTimeDescription: "in the last week",
    authorAttribution: { displayName: "Mkiyah Gonzalez" },
  },
  {
    rating: 5,
    text: { text: "Ms. Horace is an amazing tutor. Very knowledgeable and patient. Those who are and have been tutored by her have shown growth and confidence in their academics. I highly recommend her!" },
    relativePublishTimeDescription: "in the last week",
    authorAttribution: { displayName: "Brooke Demby" },
  },
];

async function fetchGoogleReviews(): Promise<{ place: PlaceDetails | null; live: boolean }> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = "ChIJ93poPMGht4kRFKXNZJMppDU";

  if (!apiKey) return { place: null, live: false };

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
        },
        next: { revalidate: 86400 }, // cache 24 hours
      }
    );

    if (!res.ok) return { place: null, live: false };
    const data: PlaceDetails = await res.json();
    return { place: data, live: true };
  } catch {
    return { place: null, live: false };
  }
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = [
  "bg-yellow-100 text-yellow-700",
  "bg-violet-100 text-violet-700",
  "bg-green-100 text-green-700",
  "bg-blue-100 text-blue-700",
  "bg-pink-100 text-pink-700",
];

export async function GoogleReviews() {
  const { place, live } = await fetchGoogleReviews();

  // Filter out reviews with no text, take top 3
  const reviews = (live && place?.reviews?.length)
    ? place.reviews.filter(r => r.text?.text && r.text.text.trim().length > 20).slice(0, 3)
    : FALLBACK_REVIEWS;

  const overallRating = live && place ? place.rating : 5.0;
  const totalReviews = live && place ? place.userRatingCount : 0;

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-violet-100 text-violet-700 border-0">What Families Are Saying</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Real results from real students</h2>
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-gray-900">{overallRating}</span>
            {totalReviews > 0 && (
              <span className="text-sm text-gray-400">({totalReviews} Google reviews)</span>
            )}
            {live && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-full">
                <CheckCircle className="w-3 h-3" /> Live from Google
              </span>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <Card key={i} className="border-yellow-200 ring-1 ring-yellow-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Google
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic line-clamp-5">
                  &ldquo;{review.text?.text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  {review.authorAttribution.photoUri ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.authorAttribution.photoUri}
                      alt={review.authorAttribution.displayName}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {initials(review.authorAttribution.displayName)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{review.authorAttribution.displayName}</p>
                    <p className="text-xs text-gray-400">{review.relativePublishTimeDescription}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* See all link */}
        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps/place/MsHoraceTutoring/@38.6214401,-76.9105131,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors"
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            See all reviews on Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
