import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt

# Importar el archivo CSV
df = pd.read_csv("Reporte_14-11-2023_16.16.8.csv", encoding='latin-1', error_bad_lines=False)

# Asumiendo que quieres probar la columna 'columna_prueba'
data = df["Q"]

# Realizar la prueba de Kolmogorov-Smirnov
d, p_value = stats.kstest(data, 'norm')
print(f'Estadística de prueba D: {d}')
print(f'Valor p: {p_value}')

# Crear un gráfico para visualizar los datos y la distribución normal
plt.figure(figsize=(12, 6))
plt.hist(data, bins=30, density=True, alpha=0.5, color='g')

xmin, xmax = plt.xlim()
x = np.linspace(xmin, xmax, 100)
p = stats.norm.pdf(x, data.mean(), data.std())
plt.plot(x, p, 'k', linewidth=2)

title = "Ajuste de datos a una distribución normal"
plt.title(title)

plt.show()
