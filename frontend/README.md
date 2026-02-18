# 🔍 Semantic Academic Search Engine - Multivariate Analysis

## 📝 Summary
This project implements an advanced search engine for scientific articles that overcomes the limitations of traditional keyword searches through **Vector Semantic Search** and **Multivariate Re-ranking**. Unlike basic search bars, this engine understands the intent behind a query. By using 384-dimensional embeddings, the system identifies contextual relationships between papers, allowing users to analyze results based on a combination of **Semantic Similarity (Score)**, **Impact (Citations)**, and **Recency (Year)**.

## 🛠️ Stack of Libraries and Technologies

- **Frontend & UI**: `React.js` - Dynamic dashboard with multivariate results table and real-time filtering.
- **Orchestration & Logic (Backend)**: `FastAPI` (Python) & `LangChain` - High-performance API orchestration and vector-store management.
- **Artificial Intelligence and Data**:
  - `HuggingFace (all-MiniLM-L6-v2)`: For high-dimensional vector generation.
  - `Pinecone`: Cloud-native Vector Database for high-speed similarity retrieval.



## ⚙️ System and Architecture

The system follows a data flow from document ingestion to results visualization.

![alt text](image.png)

The diagram represents the system's overall architecture, where the Ingest process transforms the dataset.csv into vectors using the HuggingFace model for storage in the Pinecone vector database. The operational flow begins when the user interacts with the React interface, sending a query and dynamic parameters ($k$ and time filter) to the FastAPI backend, which coordinates a semantic similarity search in Pinecone to retrieve the most relevant documents. Finally, the system applies a multivariate re-ranking that combines the similarity score with the publication year, returning a visually categorized and enriched results table to the end user.

## ⚙️ Process Flow 

The engine operates under a four-stage lifecycle:
1. **Detection of Intent**: The user query is transformed into a mathematical vector using Sentence Transformers.
2. **Semantic Retrieval**: The query vector is compared against the Pinecone database using **Cosine Similarity**.
3. **Multivariate Filtering**: The system retrieves the **Top-k** documents and applies dynamic sorting based on metadata (Year/Citations).
4. **Enriched Response**: The React UI renders a detailed table including authors, venues, and an expandable abstract for deep analysis.

## 📊 Data Structure & Multivariate Metadata

To ensure a true multivariate analysis, each document in the vector store contains the following metadata fields:

| Field | Type | Purpose in Analysis |
| :--- | :--- | :--- |
| `title` | String | Main identifier of the research paper. |
| `authors` | String | Identifies key experts and researchers. |
| `abstract` | String | Source for semantic embedding and user preview. |
| `year` | Integer | Temporal variable for the "Recent" filter. |
| `n_citation` | Integer | Quantitative variable to measure academic impact. |
| `venue` | String | Source journal or conference (e.g., IEEE, Nature). |

## 📐 Architecture: Semantic Search Engine
The system uses a decoupled architecture where the business logic is separated from the vector storage.

- **Ingest Process**: Transforms `dataset.csv` into 384-dimensional vectors.
- **Operational Flow**: React → FastAPI → LangChain → Pinecone.



## 📂 Repository Structure

- `notebook.ipynb`: Data cleaning, embedding generation, and Pinecone population.
- `main.py`: FastAPI server handling semantic search queries and re-ranking logic.
- `App.js`: React frontend providing the multivariate interface.
- `dataset.csv`: Academic dataset with multivariate features (Citations, Years, etc.).



## 💡 Conclusiones

The system demonstrates high semantic accuracy by using embeddings that identify deep contextual relationships, such as linking "AI" with "Machine Learning" without exact keyword matches. The architecture successfully achieves a Multivariate Analysis by combining semantic scores with quantitative data (Citations) and temporal data (Year), providing a robust tool for modern researchers.


## 📚 Referencias

* FastAPI documentation: [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)
* Pinecone Vector Database: [https://www.pinecone.io/](https://www.pinecone.io/)
* HuggingFace Models: [https://huggingface.co/models](https://huggingface.co/models)
* Academic Dataset: Own / `dataset.csv`
