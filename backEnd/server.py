import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
import uuid
from datetime import datetime
import sys
import os

# Add path to AI directory so we can import agent.py
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'ai', 'DataAgent'))

# Import the agent
try:
    from agent import ask_agent
except ImportError:
    # Fallback function if agent.py doesn't exist or can't be imported
    def ask_agent(query):
        return "AI agent not available. This is a placeholder response."

# Create FastAPI Models
class Product(BaseModel):
    id: int
    name: str
    price: float
    category: str
    description: Optional[str] = None
    image_url: Optional[str] = None

# Enhanced PurchaseRequest to include all product details
class PurchaseRequest(BaseModel):
    product_id: int
    quantity: int = 1
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    rating: Optional[float] = None
    review_count: Optional[int] = None
    developer: Optional[str] = None
    publisher: Optional[str] = None

# Update the PurchaseResponse to include AI message
class PurchaseResponse(BaseModel):
    transaction_id: str
    product_id: int
    product_name: str
    quantity: int
    total_price: float
    purchase_date: str
    status: str
    ai_message: Optional[str] = None  # Add this field

# Create a FastAPI instance
app = FastAPI(
    title="AIStore API",
    description="A simple API for the AIStore application",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def index():
   return {"message": "Hello World"}

@app.get("/health")
async def health():
    return {"status": "ok"}

# Sample product data
products = [
    Product(id=1, name="AI Assistant", price=49.99, category="Software", description="An AI assistant for your daily tasks", image_url="http://example.com/image1.jpg"),
    Product(id=2, name="AI Game", price=29.99, category="Games", description="A fun AI-powered game", image_url="http://example.com/image2.jpg"),
]

# Purchase endpoint
@app.post("/api/purchase", response_model=PurchaseResponse)
async def purchase_product(request: PurchaseRequest):
    # Find the product by ID or use provided details
    product = None
    
    # Try to find product in our database first
    for p in products:
        if p.id == request.product_id:
            product = p
            break
    
    # If product not found in our database but details are provided, use those
    if not product and request.name and request.price:
        # Instead of rejecting, we'll use the provided details
        product_name = request.name
        product_price = request.price
    elif product:
        product_name = product.name
        product_price = product.price
    else:
        raise HTTPException(status_code=404, detail="Product not found and insufficient details provided")
    
    # Generate a unique transaction ID
    transaction_id = str(uuid.uuid4())
    
    # Calculate total price
    total_price = product_price * request.quantity
    
    # In a real app, we would save the purchase details to a database here
    # For MVP, we'll just print the details to the console for debugging
    print(f"--- Purchase Details ---")
    print(f"Product ID: {request.product_id}")
    print(f"Name: {request.name}")
    print(f"Category: {request.category}")
    print(f"Price: {request.price}")
    print(f"Rating: {request.rating}")
    print(f"Review Count: {request.review_count}")
    print(f"Developer: {request.developer}")
    print(f"Publisher: {request.publisher}")
    print(f"Transaction ID: {transaction_id}")
    print(f"Total: ${total_price}")
    print(f"------------------------")
    
    # Call the AI agent with purchase details
    product_name = request.name if request.name else "your product"
    agent_prompt = f"""
    Please send a trace into application insights for this purchase with the following details:
    - Activity Type: Purchase
    - Product ID: {request.product_id}
    - Product Name: {product_name}
    - Category: {request.category if request.category else "N/A"}
    - Price: ${product_price:.2f}
    - Quantity: {request.quantity}
    - Total: ${total_price:.2f}
    - Transaction ID: {transaction_id}
    - Date: {datetime.now().isoformat()}
    - Developer: {request.developer if request.developer else "N/A"}
    - Publisher: {request.publisher if request.publisher else "N/A"}
    - Rating: {request.rating if request.rating else "N/A"}
    - Review Count: {request.review_count if request.review_count else "N/A"}
    """
    
    try:
        ai_response = ask_agent(agent_prompt)
    except Exception as e:
        print(f"Error calling AI agent: {str(e)}")
        ai_response = "Thank you for your purchase!"
    
    # Return purchase confirmation with AI response
    return PurchaseResponse(
        transaction_id=transaction_id,
        product_id=request.product_id,
        product_name=product_name,
        quantity=request.quantity,
        total_price=total_price,
        purchase_date=datetime.now().isoformat(),
        status="completed",
        ai_message=ai_response  # Add the AI response to the response
    )

if __name__ == "__main__":
   uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)