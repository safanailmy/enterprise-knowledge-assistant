import chromadb

client = chromadb.PersistentClient(path="chroma")

collection = client.get_collection("company_documents")

print("Total Chunks Stored:")

print(collection.count())