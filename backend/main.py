from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_huggingface import HuggingFaceEmbeddings 
from langchain_pinecone import PineconeVectorStore
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

@app.get("/search")
async def search(query: str, recent: bool = False, k: int = 4): # <--- CAMBIO: Ahora recibe k (por defecto 4)
    # Usamos el modelo gratuito
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    
    # Conectamos con el índice de Pinecone
    vectorstore = PineconeVectorStore(
        index_name="academic-search", 
        embedding=embeddings
    )
    
    # CAMBIO: Ahora usamos la variable k que viene desde el frontend
    docs_with_score = vectorstore.similarity_search_with_score(query, k=k)
    
    results = []
    for doc, score in docs_with_score:
        results.append({
            "title": doc.metadata.get("title", "Sin título"),
            "venue": doc.metadata.get("venue", "N/A"),
            "year": int(doc.metadata.get("year", 0)),
            "score": round(float(score), 4) 
        })
    
    if recent:
        results.sort(key=lambda x: x['year'], reverse=True)
        
    return results