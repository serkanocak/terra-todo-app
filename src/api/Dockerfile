# 1. Base Stage (Çalışma Zamanı)
# Uygulamanın çalışacağı çok hafif imaj (Sadece ASP.NET Core Runtime içerir)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
# Uygulamamız 8080 portundan yayın yapacak
EXPOSE 8080

# 2. Build Stage (Derleme)
# İçerisinde .NET SDK barındıran, derleme yapabileceğimiz büyük imaj
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Sadece csproj dosyasını kopyalayıp restore yapıyoruz (Layer Caching avantajı için)
COPY ["Terra.Api.csproj", "."]
RUN dotnet restore "./Terra.Api.csproj"

# Tüm kaynak kodları kopyalayıp build alıyoruz
COPY . .
WORKDIR "/src/."
RUN dotnet build "./Terra.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# 3. Publish Stage (Yayınlama)
# Derlenen kodları yayına hazır (publish) hale getiriyoruz
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Terra.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# 4. Final Stage (Son Aşama)
# Base (runtime) imajına dönüyoruz ve sadece publish edilmiş dosyaları içine kopyalıyoruz
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Terra.Api.dll"]
