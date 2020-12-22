/** \file
*  Total Square Destruction
*/

string name = "SquareOff";
string description = "Square Off Sound Destruction";

array<string> inputParametersNames = {"Gain", "Gate"};
array<string> inputParametersUnits = {"dB", "dB"};
array<double> inputParameters(inputParametersNames.length);
array<double> inputParametersMin = {-72, -72};
array<double> inputParametersMax = {0, 0};
array<double> inputParametersDefault = {0, 0};

double gain = 0;
double thresh = .01;

void processSample(array<double> &ioSample)
{
  for (uint channel = 0; channel < audioInputsCount; channel++)
  {
    if (ioSample[channel] < thresh)
      ioSample[channel] = 0;
    else if (ioSample[channel] > 0)
      ioSample[channel] = gain;
    else
      ioSample[channel] = -gain;
  }
}

void updateInputParameters()
{
  gain = pow(10, inputParameters[0] / 20);
  thresh = pow(10, inputParameters[1] / 20);
}
