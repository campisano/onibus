// OnibusModel
function OnibusModel(DATAHORA, ORDEM, LINHA, LATITUDE, LONGITUDE, VELOCIDADE)
{
    var self = this;
    self.DATAHORA = DATAHORA;
    self.ORDEM = ORDEM;
    self.LINHA = LINHA;
    self.LATITUDE = LATITUDE;
    self.LONGITUDE = LONGITUDE;
    self.VELOCIDADE = VELOCIDADE;
}



// GeoIPModel
function GeoIPModel(ip, country, region, city, longitude, latitude, timezone)
{
    var self = this;
    self.ip = ip;
    self.country = country;
    self.region = region;
    self.city = city;
    self.longitude = longitude;
    self.latitude = latitude;
    self.timezone = timezone;
}
