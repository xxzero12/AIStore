"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Mock data - in a real app, this would come from an API
const mockReviews = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=40",
      initials: "AJ",
    },
    rating: 5,
    title: "Best game ever!",
    content:
      "I've been playing Minecraft for years and it never gets old. The creativity and freedom this game offers is unmatched. Highly recommend for all ages!",
    date: "2023-10-15",
    helpful: 42,
    unhelpful: 3,
  },
  {
    id: 2,
    user: {
      name: "Sam Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=40",
      initials: "SW",
    },
    rating: 4,
    title: "Great game with minor issues",
    content:
      "Minecraft is fantastic for creativity and exploration. The only reason I'm giving 4 stars instead of 5 is because of occasional performance issues on larger worlds. Otherwise, it's perfect!",
    date: "2023-09-22",
    helpful: 18,
    unhelpful: 2,
  },
  {
    id: 3,
    user: {
      name: "Jamie Smith",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=40",
      initials: "JS",
    },
    rating: 5,
    title: "Hours of fun",
    content:
      "My kids and I play this together and we've built amazing worlds. The cross-platform play is fantastic as we can all join from different devices. Definitely worth every penny!",
    date: "2023-08-05",
    helpful: 31,
    unhelpful: 1,
  },
]

export default function ProductReviews({ productId }: { productId: number }) {
  const [reviews] = useState(mockReviews)
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggedIn] = useState(false) // In a real app, this would come from auth state

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setNewReview("")
      setRating(0)
      setReviewTitle("")
      // In a real app, you would add the new review to the list
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Customer Reviews</h3>

        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={review.user.avatar} alt={review.user.name} />
                      <AvatarFallback>{review.user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.user.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">{review.title}</h4>
                  <p className="text-sm text-muted-foreground">{review.content}</p>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                    <ThumbsUp className="h-3 w-3" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                    <ThumbsDown className="h-3 w-3" />
                    Not helpful ({review.unhelpful})
                  </Button>
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Write a Review</h3>

        {isLoggedIn ? (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Rating</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= (hoveredRating || rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="review-title" className="text-sm font-medium">
                Review Title
              </label>
              <input
                id="review-title"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="review-content" className="text-sm font-medium">
                Review
              </label>
              <Textarea
                id="review-content"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Share your experience with this product..."
                className="min-h-[100px]"
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting || rating === 0}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        ) : (
          <div className="rounded-lg border border-muted bg-muted/20 p-4 text-center">
            <p className="mb-2 text-sm">You need to be logged in to write a review.</p>
            <Button asChild variant="outline" size="sm">
              <a href="/auth/login">Sign in</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

