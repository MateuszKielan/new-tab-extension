import requests
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import random

def fetch_news(api_key, query="technology", page_size=20):
    """
    Function fetch_news that samples news from given urlS
    
    """
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": query,
        "language": "en",
        "pageSize": page_size,
        "apiKey": api_key
    }
    response = requests.get(url, params=params)
    data = response.json()
    return pd.DataFrame(data["articles"])

def vectorize_articles(df):
    """
    Function vectorize_articles that creates a working vector from text title and description
    """
    df["text"] = df["title"] + " " + df["description"].fillna("")
    vectorizer = TfidfVectorizer(stop_words="english", max_df=0.7)
    vectors = vectorizer.fit_transform(df["text"])
    return vectors

def cluster_articles(vectors, num_clusters=5):
    """
    Function cluster_articles that clusters the articles according to k-means algorithm
    """
    # Use k means clustering
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    kmeans.fit(vectors)
    return kmeans.labels_

def sample_by_cluster(df, labels):
    """
    Function sample_by_cluster that samples couple of articles per cluster
    """
    df["cluster"] = labels
    sampled = df.groupby("cluster").apply(lambda x: x.sample(min(2, len(x))))
    return sampled.reset_index(drop=True)[["title", "description", "url"]]

def sample_news(api_key, query="technology"):
    df = fetch_news(api_key, query)
    vectors = vectorize_articles(df)
    labels = cluster_articles(vectors)
    samples = sample_by_cluster(df, labels)
    return samples

if __name__ == "__main__":
    api_key = "478967ea948d4cf8a9753fa67aaf162c"
    result = sample_news(api_key, query="AI")
    final_res = result.to_string(index=False)

    print(final_res)
