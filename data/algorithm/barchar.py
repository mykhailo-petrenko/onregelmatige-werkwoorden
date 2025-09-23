import matplotlib.pyplot as plt

# Data
data = [
    [ '135', 1, 2389, 0.2389 ],
    [ '344', 1, 2243, 0.2243 ],
    [ '70', 2, 1103, 0.1103 ],
    [ '98', 2, 1182, 0.1182 ],
    [ '128', 3, 769, 0.0769 ],
    [ '83', 3, 799, 0.0799 ],
    [ '350', 4, 592, 0.0592 ],
    [ '153', 5, 464, 0.0464 ],
    [ '337', 5, 459, 0.0459 ]
]

# Extract for plotting
labels = [f"{row[0]} {row[1]}" for row in data]
values = [row[2] for row in data]

# Plot
plt.figure(figsize=(10, 6))
plt.bar(labels, values)
plt.xlabel("Entity ID")
plt.ylabel("Count")
plt.title("Bar Chart of Entity Counts")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
