# Chat Titles using Term-Frequency

Current chatbot applications send an extra request to name the chat with the user. This
creates millions of redundant requests that slow UX, inflate compute costs, and add
operational complexity for a purely cosmetic feature. A lightweight approach using
classical ML techniques (tokenize prompt+reply, remove stop-words, score term frequency,
select top-k, and preserve original order) generates equally coherent titles without any
additional inference. This approach is deterministic, microsecond-fast, near-zero cost,
and scales cleanly—delivering the same user-visible outcome while dramatically improving
efficiency and spend.
