import pandas as pd
import numpy as np
import scipy.stats as stats

total_tarjeta = 26211
total_qr = 6125
total = total_tarjeta + total_qr

p_tarjeta = total_tarjeta / total
p_qr = total_qr / total

# Los valores esperados
esperados = [total * p_qr, total * p_tarjeta]

# Las observaciones
observados = [total_qr, total_tarjeta]

# Realizamos la prueba de Chi-cuadrado
chi2, p_valor = stats.chisquare(f_obs=observados, f_exp=esperados)

df = pd.DataFrame({
    'Chi-cuadrado': [chi2],
    'P-valor': [p_valor]
})

df.to_csv('verificationState.csv', index=False)

print(f"Chi-cuadrado: {chi2}")
print(f"P-valor: {p_valor}")
