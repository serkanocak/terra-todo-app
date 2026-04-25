# Aşama 1: Build (İnşa) Aşaması
FROM node:20-alpine AS build
WORKDIR /app

# Önce paket dosyalarını kopyalayıp bağımlılıkları yüklüyoruz (Cache optimizasyonu için)
COPY package*.json ./
RUN npm ci

# Kodun geri kalanını kopyalıyoruz
COPY . .

# React projesini production için derliyoruz (dist klasörü oluşur)
RUN npm run build

# Aşama 2: Serve (Sunum) Aşaması
FROM nginx:alpine

# Nginx'in default HTML klasöründeki içeriği siliyoruz
RUN rm -rf /usr/share/nginx/html/*

# 1. Aşamada (build) oluşan dist klasöründeki dosyaları Nginx'in sunacağı yere kopyalıyoruz
COPY --from=build /app/dist /usr/share/nginx/html

# İsteğe bağlı olarak özel bir nginx.conf kopyalanabilir ama şimdilik default olan yeterli.

# Nginx default olarak 80 portundan hizmet verir
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]
